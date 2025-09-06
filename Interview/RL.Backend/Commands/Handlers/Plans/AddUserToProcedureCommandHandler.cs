using MediatR;
using RL.Backend.Exceptions;
using RL.Backend.Models;
using RL.Data;
using RL.Data.DataModels;
using System.Data.Entity;
using System.Numerics;

namespace RL.Backend.Commands.Handlers.Plans
{
    public class AddUserToProcedureCommandHandler : IRequestHandler<AddUserToProcedureCommand, ApiResponse<Unit>>
    {
        private readonly RLContext _context;

        public AddUserToProcedureCommandHandler(RLContext context) 
        {
            _context = context;
        }

        public async Task<ApiResponse<Unit>> Handle(AddUserToProcedureCommand request, CancellationToken cancellationToken)
        {
            try
            {
                //Validate request
                if (request.UserId < 1)
                    return ApiResponse<Unit>.Fail(new BadRequestException("Invalid UserId"));
                if (request.ProcedureId < 1)
                    return ApiResponse<Unit>.Fail(new BadRequestException("Invalid ProcedureId"));

                var plan = _context.Plans                    
                    .Include(p => p.UserProcedures)
                    .FirstOrDefault(p => p.PlanId == request.PlanId);

                if (!(request.UserId == 0))
                {                 

                    var User = _context.Users.FirstOrDefault(p => p.UserId == request.UserId);

                    if (plan is null)
                        return ApiResponse<Unit>.Fail(new NotFoundException($"PlanId: {request.PlanId} not found"));
                    if (User is null)
                        return ApiResponse<Unit>.Fail(new NotFoundException($"UserId: {request.UserId} not found"));

                    //Already has the procedure, so just succeed
                    if (plan.UserProcedures.Any(p => p.UserId == User.UserId && p.ProcedureId == request.ProcedureId && request.PlanId == p.PlanId))
                        return ApiResponse<Unit>.Succeed(new Unit());

                    if (request.Operation == 1)
                    {
                        plan.UserProcedures.Add(new UserProcedure
                        {
                            UserId = User.UserId,
                            ProcedureId = request.ProcedureId,
                            PlanId = plan.PlanId,
                            //Procedure = _context.Procedures.FirstOrDefault(x => x.ProcedureId == request.ProcedureId),
                            //User = _context.Users.FirstOrDefault(x => x.UserId == User.UserId)
                        });
                    }
                    else
                    {
                        var users = plan.UserProcedures.FirstOrDefault(x => x.User.UserId == request.UserId);

                        plan.UserProcedures.ToList().Remove(users);
                        
                    }
                }
                else
                {
                    var users = plan.UserProcedures.Select(x => x.User);
                    foreach (var item in users)
                    {
                        plan.UserProcedures.ToList().RemoveAll(x => x.User.UserId == item.UserId);
                    }
                    
                }

                await _context.SaveChangesAsync();

                return ApiResponse<Unit>.Succeed(new Unit());
            }
            catch (Exception e)
            {
                return ApiResponse<Unit>.Fail(e);
            }
        }
    }
}

﻿using MediatR;
using RL.Backend.Models;

namespace RL.Backend.Commands
{
    public class AddUserToProcedureCommand : IRequest<ApiResponse<Unit>>
    {
        public int PlanId {  get; set; }
        public int UserId { get; set; }
        public int ProcedureId { get; set; }
        public int Operation { get; set; }
    }
}

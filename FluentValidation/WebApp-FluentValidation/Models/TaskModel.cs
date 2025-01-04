using System;
using System.Collections.Generic;
using FluentValidation;


namespace WebApp_FluentValidation.Models
{
    public class TaskModel
    {
        public string? Description { get; set; }
        public DateTime DueDate { get; set; }
        public bool RemindMe { get; set; }
        public int? ReminderMinutesBeforeDue { get; set; }
        public List<string>? SubItems { get; set; }
    }

    public class TaskModelValidator : AbstractValidator<TaskModel>
    {
        public TaskModelValidator()
        {
            RuleFor(t => t.Description).NotEmpty();
            RuleFor(t => t.DueDate)
            .GreaterThanOrEqualTo(DateTime.Today)
            .WithMessage("Due date must be in future");
            When(t =>  t.RemindMe == true, () =>
            {
                RuleFor(t => t.ReminderMinutesBeforeDue).NotNull()
                .WithMessage("Remainder miniutes must be set")
                .GreaterThan(0).WithMessage("Remainder miniutes must be greater than zero");
            }
            );
            RuleForEach(t => t.SubItems)
            .NotEmpty().WithMessage("Values in the sub array must not be empty");
        }
    }

}
using SchoolSystemCycling.Models.Entities;
using SchoolSystemCycling.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using SchoolSystemCycling.Models.Dtos;

namespace SchoolSystemCycling.Services;

public class BasicQueryService {
    private readonly ApplicationDbContext _context;

    public BasicQueryService(ApplicationDbContext context) {
        _context = context;
    }

    public async Task<Instructor?> GetInstructorByIdWithDept(int instructorId) {
        return await _context.Instructors
            .Where(instr => instr.Id == instructorId)
            .Include(instr => instr.Department)
            .SingleOrDefaultAsync(); // only returning one element, single returns one value because and thats it. **should only be one return value**
            // .FirstOrDefaultAsync(); both return a single , taking the 'first of something'on the list ** first would never know** if more than one instance looking for the first item.
    }

//     public async Task<InstructorDto?> GetInstructorDtoByIdWithDept(int instructorId) {


//         return await _context.Instructors
//             .Where(instr => instr.Id == instructorId)
//             .Include(instr => instr.Department)
//             .SingleOrDefaultAsync(); 
//     }
}
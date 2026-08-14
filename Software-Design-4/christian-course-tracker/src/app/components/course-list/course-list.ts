import { Component, inject } from '@angular/core'
import { RouterLink } from '@angular/router'
import { Course } from '../../models/course'
import { CourseService } from '../../services/course-service'

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './course-list.html',
  styleUrls: ['./course-list.css'],
})
export class CourseList {
  private _courseService = inject(CourseService)

  public courses: Course[] = this._courseService.getAllCourses()

  public deleteCourse(id: string): void {
    this._courseService.deleteCourse(id)
  }
}
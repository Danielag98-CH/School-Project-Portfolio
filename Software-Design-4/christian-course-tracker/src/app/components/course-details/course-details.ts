import { Component, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { Course } from '../../models/course'
import { CourseService } from '../../services/course-service'

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css'
})
export class CourseDetails {
  private _route = inject(ActivatedRoute)
  private _router = inject(Router)
  private _courseService = inject(CourseService)

  public course: Course | null = null
  public invalidId = false

  constructor() {
    const courseId = this._route.snapshot.paramMap.get('courseId')

    if (!courseId) {
      this.invalidId = true
      return
    }

    const foundCourse = this._courseService.getCourseById(courseId)

    if (!foundCourse) {
      this.invalidId = true
      return
    }

    this.course = { ...foundCourse }
  }

  public done(): void {
    if (!this.course) {
      return
    }

    this._courseService.updateCourse(this.course)
    this._router.navigate(['/'])
  }
}
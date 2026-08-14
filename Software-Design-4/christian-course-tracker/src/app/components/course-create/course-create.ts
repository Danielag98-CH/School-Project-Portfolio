import { Component, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { CourseService } from '../../services/course-service'

@Component({
  selector: 'app-course-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './course-create.html',
  styleUrl: './course-create.css'
})
export class CourseCreate {
  private _courseService = inject(CourseService)
  private _router = inject(Router)

  public title: string = ''
  public instructor: string = ''
  public credits: number = 0
  public isCompleted: boolean = false

  public createCourse(): void {
    this._courseService.addCourse({
      title: this.title,
      instructor: this.instructor,
      credits: this.credits,
      isCompleted: this.isCompleted
    })

    this._router.navigate(['/'])
  }

  public cancel(): void {
    this._router.navigate(['/'])
  }
}
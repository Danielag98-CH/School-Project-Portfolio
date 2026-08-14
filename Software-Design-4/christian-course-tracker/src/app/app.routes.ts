import { Routes } from '@angular/router'
import { CourseList } from './components/course-list/course-list'
import { CourseDetails } from './components/course-details/course-details'
import { CourseCreate } from './components/course-create/course-create'
import { NotFound } from './components/not-found/not-found'

export const routes: Routes = [
  { path: '', component: CourseList },
  { path: 'courses/create', component: CourseCreate },
  { path: 'courses/:courseId', component: CourseDetails },
  { path: '**', component: NotFound }
]
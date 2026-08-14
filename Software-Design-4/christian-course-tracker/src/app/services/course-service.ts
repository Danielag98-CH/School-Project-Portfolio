import { Injectable } from '@angular/core'
import { Course } from '../models/course'

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: Course[] = [
    {
    id: '1',
    title: 'Software Design I',
    instructor: 'Dr. Allen',
    credits: 4,
    isCompleted: false
  },
  {
    id: '2',
    title: 'Database Systems',
    instructor: 'Prof. Chen',
    credits: 3,
    isCompleted: true
  },
  {
    id: '3',
    title: 'Operating Systems',
    instructor: 'Dr. Patel',
    credits: 4,
    isCompleted: false
  },
  {
    id: '4',
    title: 'Computer Networks',
    instructor: 'Prof. Ramirez',
    credits: 3,
    isCompleted: false
  },
  {
    id: '5',
    title: 'Web Development',
    instructor: 'Dr. Carter',
    credits: 3,
    isCompleted: true
  },
  {
    id: '6',
    title: 'Algorithms',
    instructor: 'Prof. Nguyen',
    credits: 4,
    isCompleted: false
  },
  {
    id: '7',
    title: 'Cybersecurity Fundamentals',
    instructor: 'Dr. Morris',
    credits: 3,
    isCompleted: true
  },
  {
    id: '8',
    title: 'Artificial Intelligence',
    instructor: 'Prof. Singh',
    credits: 3,
    isCompleted: false
  },
  {
    id: '9',
    title: 'Mobile App Development',
    instructor: 'Dr. Brooks',
    credits: 3,
    isCompleted: false
  },
  {
    id: '10',
    title: 'Cloud Computing',
    instructor: 'Prof. Evans',
    credits: 3,
    isCompleted: false
  }
]

  private nextId: number = 11  
// another option private nextId: number = this.courses.length + 1 *though the one used is slightly better*  

  public getAllCourses(): Course[] {
    return this.courses
  }

  public getCourseById(id: string): Course | undefined {
    return this.courses.find(course => course.id === id)
  }

  public addCourse(course: Omit<Course, 'id'>): void {
    this.courses.push({
      id: this.getNextId(),
      title: course.title,
      instructor: course.instructor,
      credits: course.credits,
      isCompleted: course.isCompleted
    })
  }

  public updateCourse(updatedCourse: Course): void {
    const index = this.courses.findIndex(course => course.id === updatedCourse.id)

    if (index === -1) {
      return
    }

    this.courses[index].title = updatedCourse.title
    this.courses[index].instructor = updatedCourse.instructor
    this.courses[index].credits = updatedCourse.credits
    this.courses[index].isCompleted = updatedCourse.isCompleted
  }

  public deleteCourse(id: string): void {
    const index = this.courses.findIndex(course => course.id === id)

    if (index !== -1) {
      this.courses.splice(index, 1)
    }
  }

  public getNextId(): string {
    const idToReturn = this.nextId.toString()
    this.nextId++
    return idToReturn
  }
}
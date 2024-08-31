import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from './ui/label';
import { CourseItem } from "@/app/page";

interface SelectCourseProps {
  onSelectCourse: (cid: string) => void;
  courses: CourseItem[];
}

export default function SelectCourse({onSelectCourse, courses}: SelectCourseProps) {
  return <div>
    {/* <Label>Course</Label> */}
    <Select onValueChange={onSelectCourse}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a course" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Your courses</SelectLabel>
          {courses.map(({cid, course_name}) => (
            <SelectItem value={cid} key={cid}>{course_name}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
}
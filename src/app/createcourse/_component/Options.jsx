import React, { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Userinput } from "@/app/_context/Userinput";

const Options = () => {

  const {userCourseInput, setUserCourseInput} = useContext(Userinput)

  const handleOptionsInput = (fieldName,value) =>{

    setUserCourseInput(prev=>({
      ...prev,
      [fieldName]:value
    }))
  }

  console.log(userCourseInput)



  return (
    <div className= "mx-6 md:mt-0 md:mb-0 mb-8 mt-12 md:mx-12 lg:mx-44">
      <div className=" flex flex-col md:grid grid-cols-2 lg:mx-44 mt-8 gap-8 items-center justify-evenly">
        <div>
                <label >Difficulty Level</label>
          <Select value={userCourseInput?.level} onValueChange={(value)=>handleOptionsInput('level',value)}>
            <SelectTrigger className="w-[180px] md:w-[240px] mt-1.5">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-blue-400 text-white mt-1.5">
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate"> Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
            <label htmlFor="">Course Duration</label>
            <Select value={userCourseInput?.duration} onValueChange={(value)=>handleOptionsInput('duration',value)}>
            <SelectTrigger className="w-[180px] md:w-[240px] mt-1.5">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-blue-400 text-white mt-1.5">
              <SelectItem value="1 hour">1 hour</SelectItem>
              <SelectItem value="2 hour">2 hour</SelectItem>
              <SelectItem value="More then 3 hour">More then 3 hour</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
                <label >Add a Video Content</label>
                <Select value={userCourseInput?.videoContent} onValueChange={(value)=>handleOptionsInput('videoContent',value)}>
            <SelectTrigger className="w-[180px] md:w-[240px] mt-1.5">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-blue-400 text-white mt-1.5">
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
                <label >No of Chapters</label>
          
            <Input value={userCourseInput?.chapters || "" } onChange={e=>handleOptionsInput('chapters',e.target.value)} className="w-[180px] md:w-[240px] mt-1.5" type="number"></Input>
        </div>
      </div>
    </div>
  );
};

export default Options;

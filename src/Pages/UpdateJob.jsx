import React from 'react'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react';
import { useForm } from "react-hook-form"
import CreatableSelect from 'react-select/creatable';

const UpdateJob = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const { _id, jobTitle, companyName, minPrice, maxPrice, salaryType, jobLocation, postingDate, experienceLevel, companyLogo, employmentType, description, postedBy, skills } = useLoaderData()

    const [selectedOption, setSelectedOption] = useState(null);
    const {
        register,
        handleSubmit, reset,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        data.skills = selectedOption;
        //console.log(data)
        fetch(`http://localhost:3000/update-job/${id}`, {
            method: "PATCH",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        })

            .then(res => res.json())
            .then((result) => {
                console.log(result);
                if (result.acknowledged === true) {
                    alert("Job Updated successfully!")
                    reset()   
                    navigate("/my-job")
                }
            });
    };

    const options = [
        { value: "JavaScript", label: "Javascript" },
        { value: "C++", label: "C++" },
        { value: "HTML", label: "HTML" },
        { value: "CSS", label: "CSS" },
        { value: "Python", label: "Python" },
        { value: "React", label: "React" },
        { value: "MongoDB", label: "MongoDB" },
        { value: "Redux", label: "Redux" },

    ]



    return (
        <div>
            <div className='max-w-screen-2x1 container mx-auto xl:px-24 px-4'>
                {/* form */}
                <div className='bg-[#FAFAFA] py-10 px-4 lg:px-16'>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>

                        {/* 1st row */}
                        <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
                            <div className='lg-w-1/2 w-full'>
                                <label className='block mb-2 text-lg' >Job title</label>
                                <input type="text" defaultValue={jobTitle} placeholder='Web Developer'
                                    {...register("jobTitle")} className='block w-full lg:w-120 flex-1 border-1 bg-white py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6' />
                            </div>

                            <div className='lg-w-1/2 w-full'>
                                <label className='block mb-2 text-lg' >Company Name</label>
                                <input type="text" defaultValue={companyName} placeholder='Ex: Microsoft'
                                    {...register("companyName")} className='block w-full flex-1 border-1 bg-white py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6' style={{ maxWidth: '500px' }} />
                            </div>
                        </div>

                        {/* 2nd row */}

                        <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
                            <div className='lg-w-1/2 w-full'>
                                <label className='block mb-2 text-lg'>Min salary</label>
                                <input type="text" defaultValue={minPrice} placeholder='20k'
                                    {...register("minPrice")} className='block w-full lg:w-120 flex-1 border-1 bg-white py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6' />
                            </div>

                            <div className='lg-w-1/2 w-full'>
                                <label className='block mb-2 text-lg' >Max Salary</label>
                                <input type="text" defaultValue={maxPrice} placeholder='120k'
                                    {...register("maxPrice")} className='block w-full lg:w-120 flex-1 border-1 bg-white py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6' />
                            </div>
                        </div>


                        {/* 3rd row */}

                        <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
                            <div className='lg-w-1/2 w-full'>
                                <label className='block mb-2 text-lg'>Salary Type</label>
                                <select {...register("salaryType")} className='block w-full lg:w-120 flex-1 border-1 bg-white py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6'>
                                    <option value={salaryType}>{salaryType}</option>
                                    <option value="Hourly">Hourly</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Yearly">Yearly</option>
                                </select>

                            </div>

                            <div className='lg-w-1/2 w-full'>
                                <label className='block mb-2 text-lg' >Job Location</label>
                                <input type="text" defaultValue={jobLocation} placeholder='Ex: Tashkent'
                                    {...register("jobLocation")} className='block w-full flex-1 border-1 bg-white py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6' />
                            </div>
                        </div>

                        {/* 4nd row */}

                        <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>

                            <div className='lg-w-1/2 w-full'>
                                <label className='block mb-2 text-lg' >Job Posting Date</label>
                                <input type="date" defaultValue={postingDate} placeholder='Ex: 2024-08-02'
                                    {...register("postingDate")} className='block w-full flex-1 border-1 bg-white py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6' />
                            </div>


                            <div className='lg-w-1/2 w-full'>
                                <label className='block mb-2 text-lg'>Experience Level</label>
                                <select {...register("experienceLevel")} className='block w-full lg:w-120 flex-1 border-1 bg-white py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6'>
                                    <option value={experienceLevel}>{experienceLevel}</option>
                                    <option value="NoExperience">Any</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Work remotely">Work remotely</option>
                                </select>
                            </div>
                        </div>

                        {/* 5th row */}

                        <div>
                            <label className='block mb-2 text-lg'>Required Skill Sets:</label>
                            <CreatableSelect
                                defaultValue={skills}
                                onChange={setSelectedOption}
                                options={options}
                                isMulti
                                className=''
                            />
                        </div>

                        {/* 6th row */}

                        <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>

                            <div className='lg-w-1/2 w-full'>
                                <label className='block mb-2 text-lg' >Company Logo</label>
                                <input type="url" defaultValue={companyLogo} placeholder='Paste your company logo URL'
                                    {...register("companyLogo")}
                                    className='block w-full flex-1 border-1 bg-white py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6' />
                            </div>


                            <div className='lg-w-1/2 w-full'>
                                <label className='block mb-2 text-lg'>Employment Type</label>
                                <select {...register("employmentType")} className='block w-full lg:w-120 flex-1 border-1 bg-white py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6'>
                                    <option value={employmentType}>{employmentType}</option>
                                    <option value="NoExperience">Full-time</option>
                                    <option value="Internship">Part-time</option>
                                    <option value="Work remotely">Temporary</option>
                                </select>
                            </div>
                        </div>

                        {/* 7th row */}

                        <div className='w-full'>
                            <label className='block mb-2 text-lg'>Job Description</label>
                            <textarea className='w-full pl-3 py-1.5 focus:outline-none focus:outline-none placeholder:text-gray-700' row={6} placeholder='Job Description' defaultValue={description}  {...register("description")} />
                        </div>

                        {/* last row */}

                        <div className='w-full'>
                            <label className='block mb-2 text-lg'>Job Posted By</label>
                            <input type='text'
                                defaultValue={postedBy}
                                placeholder='your email or link'
                                {...register("postedBy")}
                                className='block w-full lg:w-120 flex-1 border-1 bg-white py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6' />
                        </div>


                        <input type="submit" className='block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer' value="Update" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateJob

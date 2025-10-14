"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import Footer from "@/app/_components/Footer";
import { useRouter } from "next/navigation";

const UpdateProfile = () => {
  const [userType, setUserType] = useState("general");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [coins, setCoins] = useState(0);
  const [reward, setReward] = useState("");
  const [designation, setDesignation] = useState("");
  const [experience, setExperience] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      age : Number(age),
      gender,
      height : Number(height),
      weight : Number(weight),
      // email,
      address,
      coins,
      reward,
      phone,
      userType,
      ...(userType === "trainer" && { designation, experience : Number(experience)}),
    };

    if (userType === "general") {
      formData.designation = "",
      formData.experience = 0
    }

    const result = await fetch(`/api/profile/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      }, body: JSON.stringify(formData)
    })
    
    if(result.ok) {
      alert("Profile updated successfully"); // Display form data
      router.replace(`/dashboard/${email}/profile`);
    }else {
      alert("Profile not updated");
    }
  };

  return (
    <>
      <div className="p-12">
        <div className="p-12 max-w-lg mx-auto bg-white rounded-2xl">
          <h2 className="text-3xl font-semibold mb-4 text-center">Update Profile</h2>
          <form className="space-y-4">
            {/* Name */}
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Enter your name"
                required
                className='bg-white'
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Age */}
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                type="number"
                id="age"
                placeholder="Enter your age"
                required
                className='bg-white'
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            {/* Gender */}
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={gender}
                onValueChange={(value) => setGender(value)}
              >
                <SelectTrigger aria-label="Select Gender" className='bg-white'>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="prefer_not_to_say">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Height */}
            <div>
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                type="number"
                id="height"
                placeholder="Enter your height"
                required
                className='bg-white'
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            {/* Weight */}
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                type="number"
                id="weight"
                placeholder="Enter your weight"
                required
                className='bg-white'
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            {/* Email */}
            {/* <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
                className='bg-white'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div> */}

            {/* Address */}
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                type="text"
                id="address"
                placeholder="Enter your address"
                required
                className='bg-white'
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            {/* Phone Number */}
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                type="tel"
                id="phone"
                placeholder="Enter your phone number"
                required
                onChange={(e) => setPhone(e.target.value)}
                className='bg-white'
              />
            </div>

            {/* User Type */}
            <div>
              <Label>User Type</Label>
              <RadioGroup
                defaultValue="general"
                onValueChange={(value) => setUserType(value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="general" id="general" />
                  <Label htmlFor="general">General User</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="trainer" id="trainer" />
                  <Label htmlFor="trainer">trainer/Practitioner/Doctor</Label>
                </div>
              </RadioGroup>
            </div>


            {/* Designation and Experience (Shown only if user is trainer/Practitioner/Doctor) */}
            {userType === "trainer" && (
              <>
                <div>
                  <Label htmlFor="designation">Designation</Label>
                  <Input
                    type="text"
                    id="designation"
                    placeholder="Enter your designation"
                    className='bg-white'
                    onChange={(e) => setDesignation(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="experience">Experience (years)</Label>
                  <Input
                    type="number"
                    id="experience"
                    placeholder="Enter your experience"
                    className='bg-white'
                    onChange={(e) => setExperience(e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Submit Button */}
            <div className="mt-4 justify-center items-center flex">
              <Button onClick={handleSubmit} >
                Update Profile
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UpdateProfile;

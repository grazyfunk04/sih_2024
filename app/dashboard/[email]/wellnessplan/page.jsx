"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Footer from "@/app/_components/Footer";

const WellnessPlan = () => {
  const [step, setStep] = useState(1);
  const [selectedSex, setSelectedSex] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const [selectedMedicalConditions, setSelectedMedicalConditions] = useState(
    []
  );
  const [selectedLifestyle, setSelectedLifestyle] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState([]);
  const [selectedFamilyHistory, setSelectedFamilyHistory] = useState([]);
  const [speciallyAbled, setSpeciallyAbled] = useState("");

  const medicalConditions = [
    "Heart Disease",
    "Diabetes",
    "Hypertension",
    "Asthma",
    "Allergies",
    "Chronic Pain",
    "Arthritis",
    "Depression",
    "Anxiety",
    "None",
    "Migraine",
    "Thyroid Disorder",
    "NA",
  ];

  const lifestyleOptions = [
    "Active",
    "Sedentary",
    "Balanced",
    "Stressed",
    "Healthy",
    "Busy",
    "Relaxed",
    "Moderate Exercise",
    "High-Intensity Exercise",
    "Workaholic",
  ];

  const dietOptions = [
    "Balanced Diet",
    "High-Protein",
    "Vegetarian",
    "Vegan",
    "Keto",
    "Low-Carb",
    "High-Carb",
    "Intermittent Fasting",
    "Junk Food",
    "Organic Only",
    "Gluten-Free",
    "Pescatarian",
    "Low-Sugar",
    "Fast Food Regular",
    "Mixed Diet",
  ];

  const familyHistoryOptions = [
    "Heart Disease",
    "Diabetes",
    "Cancer",
    "Hypertension",
    "Alzheimer's Disease",
    "Stroke",
    "Mental Illness",
    "Autoimmune Disorder",
    "Genetic Disorder",
    "None",
    "Asthma",
    "Arthritis",
    "Blood Disorders",
    "Obesity",
    "Kidney Disease",
    "Osteoporosis",
    "Thyroid Disorder",
  ];

  const speciallyAbledOptions = ["Yes", "No", "Partial", "Prefer not to say"];

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const toggleSelection = (item, state, setState) => {
    setState((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const showResult = () => {
    alert(
      `Sex: ${selectedSex}, Age: ${age}, Weight: ${weight}, Height: ${height}, 
      Diet: ${selectedDiet.join(
        ", "
      )}, Family History: ${selectedFamilyHistory.join(", ")}, 
      Lifestyle: ${selectedLifestyle.join(
        ", "
      )}, Medical Conditions: ${selectedMedicalConditions.join(", ")}, 
      Specially Abled: ${speciallyAbled}`
    );
  };

  const checkDisabled = () => {
    return (
      age &&
      weight &&
      height &&
      selectedSex &&
      speciallyAbled &&
      selectedDiet.length > 0 &&
      selectedFamilyHistory.length > 0 &&
      selectedLifestyle.length > 0 &&
      selectedMedicalConditions.length > 0
    );
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-12">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-xl w-full">
          {step === 1 && (
            <>
              <h2 className="mb-6 text-2xl font-semibold text-center">
                Personal Details
              </h2>
              <div className="mb-4">
                <Select onValueChange={(value) => setSelectedSex(value)}>
                  <SelectTrigger className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none bg-white">
                    <SelectValue placeholder="Sex" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-4">
                <Input
                  className="bg-white w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min="0"
                  max="120"
                />
              </div>

              <div className="mb-4">
                <Input
                  className="bg-white w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Height (cm)"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  min="20"
                  max="220"
                />
              </div>

              <div className="mb-4">
                <Input
                  className="bg-white w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Weight (kg)"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  min="20"
                  max="220"
                />
              </div>

              <div className="flex justify-end mt-6">
                <Button onClick={() => setStep(2)}>Next</Button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="mb-6 text-2xl font-semibold text-center">
                Additional Information
              </h2>

              {/* Buttons for Medical Conditions */}
              <div className="mb-4">
                <label className="block mb-2 text-md font-medium text-gray-700">
                  Any existing medical conditions?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {medicalConditions.map((condition, index) => (
                    <Button
                      key={index}
                      className={`w-full text-left px-4 py-2 border rounded-xl ${
                        selectedMedicalConditions.includes(condition)
                          ? "bg-blue-500 text-white hover:bg-blue-500 hover:text-white"
                          : "bg-white border-gray-300 text-black hover:bg-white hover:text-black"
                      }`}
                      onClick={() =>
                        toggleSelection(
                          condition,
                          selectedMedicalConditions,
                          setSelectedMedicalConditions
                        )
                      }
                    >
                      {condition}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button onClick={() => handleBack()}>Back</Button>
                <Button onClick={() => handleNext()}>Next</Button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="mb-6 text-2xl font-semibold text-center">
                Describe your lifestyle in a few lines.
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {lifestyleOptions.map((option, index) => (
                  <Button
                    key={index}
                    className={`w-full text-left px-4 py-2 border rounded-xl ${
                      selectedLifestyle.includes(option)
                        ? "bg-blue-500 text-white hover:bg-blue-500 hover:text-white"
                        : "bg-white border-gray-300 text-black hover:bg-white hover:text-black"
                    }`}
                    onClick={() =>
                      toggleSelection(
                        option,
                        selectedLifestyle,
                        setSelectedLifestyle
                      )
                    }
                  >
                    {option}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <Button onClick={() => handleBack()}>Back</Button>
                <Button onClick={() => handleNext()}>Next</Button>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="mb-6 text-2xl font-semibold text-center">
                Describe your current diet.
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {dietOptions.map((option, index) => (
                  <Button
                    key={index}
                    className={`w-full text-left px-4 py-2 border rounded-xl ${
                      selectedDiet.includes(option)
                        ? "bg-blue-500 text-white hover:bg-blue-500 hover:text-white"
                        : "bg-white border-gray-300 text-black hover:bg-white hover:text-black"
                    }`}
                    onClick={() =>
                      toggleSelection(option, selectedDiet, setSelectedDiet)
                    }
                  >
                    {option}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <Button onClick={() => handleBack()}>Back</Button>
                <Button onClick={() => handleNext()}>Next</Button>
              </div>
            </>
          )}

          {step === 5 && (
            <>
              <h2 className="mb-6 text-2xl font-semibold text-center">
                Any family history of medical conditions?
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {familyHistoryOptions.map((option, index) => (
                  <Button
                    key={index}
                    className={`w-full text-left px-4 py-2 border rounded-xl ${
                      selectedFamilyHistory.includes(option)
                        ? "bg-blue-500 text-white hover:bg-blue-500 hover:text-white"
                        : "bg-white border-gray-300 text-black hover:bg-white hover:text-black"
                    }`}
                    onClick={() =>
                      toggleSelection(
                        option,
                        selectedFamilyHistory,
                        setSelectedFamilyHistory
                      )
                    }
                  >
                    {option}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <Button onClick={() => handleBack()}>Back</Button>
                <Button onClick={() => handleNext()}>Next</Button>
              </div>
            </>
          )}

          {step === 6 && (
            <>
              <h2 className="mb-6 text-2xl font-semibold text-center">
                Do you come under the specially abled category?
              </h2>
              <div className="flex flex-col gap-2">
                {speciallyAbledOptions.map((option, index) => (
                  <Button
                    key={index}
                    className={`w-full text-left px-4 py-2 border rounded-xl ${
                      speciallyAbled === option
                        ? "bg-blue-500 text-white hover:bg-blue-500 hover:text-white"
                        : "bg-white border-gray-300 text-black hover:bg-white hover:text-black"
                    }`}
                    onClick={() => setSpeciallyAbled(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <Button onClick={() => handleBack()}>Back</Button>
                <Button onClick={showResult}>Submit</Button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WellnessPlan;

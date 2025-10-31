'use client'

import { useEffect, useState } from "react";
import ExperienceCard from "./components/ExperienceCard";
import { getExperiences, Experience } from "./utils/api";
import { useSearch } from "./context/SearchContext";

export default function Home() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>([]);
  const { searchTerm } = useSearch();

  useEffect(() => {
    async function fetchData() {
      const data = await getExperiences();
      const expData = data.data || data;
      setExperiences(expData);
      setFilteredExperiences(expData);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredExperiences(experiences);
    } else {
      setFilteredExperiences(
        experiences.filter((exp) =>
          exp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exp.location.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, experiences]);

  return (
    <div className="bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 min-h-screen pt-28 pb-8 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 justify-items-center">
      {filteredExperiences.map((experience, index) => (
        <ExperienceCard key={index} experience={experience} />
      ))}
    </div>
  );
}

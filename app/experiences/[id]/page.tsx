import { getExperienceById } from "@/app/utils/api";
import { notFound } from "next/navigation";
import ExperienceBookingClient from "./ExperienceBookingClient";

interface ExperiencePageProps {
  params: { id: string };
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  console.log("Params:", params);
  const { id } = await params;
  console.log(id);

  // Fetch data based on id
  const experienceraw = await getExperienceById(id);
  const experience = experienceraw.data;
  console.log(experience);

  if (!experience) {
    notFound(); // shows 404 page if invalid ID
  }

  return <ExperienceBookingClient experience={experience} />;
}
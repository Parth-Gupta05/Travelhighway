import { getExperienceById } from "@/app/utils/api";
import { notFound } from "next/navigation";
import ExperienceBookingClient from "./ExperienceBookingClient";

interface ExperiencePageProps {
  params: { id: string };
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {

  const { id } = await params;


  // Fetch data based on id
  const experienceraw = await getExperienceById(id);
  const experience = experienceraw.data;


  if (!experience) {
    notFound(); // shows 404 page if invalid ID
  }

  return <ExperienceBookingClient experience={experience} />;
}
export interface Experience {
  _id: string;
  name: string;
  location: string;
  detail: string;
  dates: string[];
  timeslots: Array<{
    _id: string;
    time: string;
    slotsQty: number;
  }>;
  about: string;
  image: string;
  price:number
}

export interface ExperienceResponse {
  success: boolean;
  data: Experience[];
}

export interface AvailableSlot {
  date: string;
  time: string;
  slotsQty: number | null;
}

export interface ExperienceDetail extends Experience {
  description: string;
  availableSlots?: AvailableSlot[];
}

export interface ExperienceDetailResponse {
  description: string;
  location: string;
  name: string;
  success: boolean;
  data: ExperienceDetail;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getExperiences(): Promise<ExperienceResponse> {
  const response = await fetch(`${API_URL}/experiences`);
  console.log(response)

  if (!response.ok) {
    throw new Error('Failed to fetch experiences');
  }

  return response.json();
}

export async function getExperienceById(id: string): Promise<ExperienceDetailResponse> {
  if (!id) throw Error('Missing experience id');

  const response = await fetch(`${API_URL}/experiences/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch experience details');
  }

  return response.json();
}


export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Sector {
  id: string;
  title: string;
  icon: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  expertise: string[];
}

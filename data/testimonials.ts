export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
}

export const testimonials: TestimonialItem[] = [
  {
    id: 1,
    name: "Anna Müller",
    role: "Privatkundin, Zürich",
    text: "Unser alter Eichenparkett sah extrem abgenutzt aus. Das Team hat ihn sensationell aufbereitet – staubfrei und termingerecht. Er sieht aus wie neu!",
    rating: 5,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRCeQlyl_ZrejbSyV0FunoFKwjkjKCeGvMY0CVKnU_4UOB-wMPEUFxPaEpuoEiEPlWTqsHRBHt7RBIBjGD_V9XVd4aaNOhqW5kra7KEBuMWuKXU0Z93pk65SyPuGBA6koofeZTFytJWKy-XVBRKOQhaNR1AaiRM03RDkyrXRExayAqviHQUWUtMh6bKKjZ_v37zZ8R9kqqSpWXjLJjqVOHcVYyASFJLbqlMprHcV1j-0N1QFmNPc9znpBaYlzZEESAebodotlZOmU"
  },
  {
    id: 2,
    name: "Thomas Gerber",
    role: "Hausverwaltung, Bern",
    text: "Wir arbeiten seit Jahren mit Parketpflege.ch zusammen. Die Ergebnisse sind immer einwandfrei und die Beratung zur richtigen Pflege ist Gold wert.",
    rating: 5,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRCeQlyl_ZrejbSyV0FunoFKwjkjKCeGvMY0CVKnU_4UOB-wMPEUFxPaEpuoEiEPlWTqsHRBHt7RBIBjGD_V9XVd4aaNOhqW5kra7KEBuMWuKXU0Z93pk65SyPuGBA6koofeZTFytJWKy-XVBRKOQhaNR1AaiRM03RDkyrXRExayAqviHQUWUtMh6bKKjZ_v37zZ8R9kqqSpWXjLJjqVOHcVYyASFJLbqlMprHcV1j-0N1QFmNPc9znpBaYlzZEESAebodotlZOmU"
  },
  {
    id: 3,
    name: "Sarah Leutenegger",
    role: "Ladenbesitzerin, Basel",
    text: "Trotz hoher Laufkundschaft haben sie unseren Boden wieder zum Glänzen gebracht. Besonders beeindruckt hat mich die professionelle und schnelle Abwicklung.",
    rating: 5,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRCeQlyl_ZrejbSyV0FunoFKwjkjKCeGvMY0CVKnU_4UOB-wMPEUFxPaEpuoEiEPlWTqsHRBHt7RBIBjGD_V9XVd4aaNOhqW5kra7KEBuMWuKXU0Z93pk65SyPuGBA6koofeZTFytJWKy-XVBRKOQhaNR1AaiRM03RDkyrXRExayAqviHQUWUtMh6bKKjZ_v37zZ8R9kqqSpWXjLJjqVOHcVYyASFJLbqlMprHcV1j-0N1QFmNPc9znpBaYlzZEESAebodotlZOmU"
  }
];

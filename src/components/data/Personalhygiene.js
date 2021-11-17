export const Personalhygiene = {
  showing: 'video',
  courseId: "1001",
  title_: "Personalhygiene",
  title: {
    Schulung: "Personalhygiene",
    Training: "Personal Hygiene",
  },
  categories: ["Verkauf", "Versand", "Produktion" ],
  instructions: {},
  video: {
    autoplay: false,
    controls: true,
    fluid: true,
    responsive: true,
    preload: 'auto', 
    poster: "https://baeckerei-muenzel.de/wp-content/uploads/poster-logo.jpg",
    sources: [{
      src: 'https://baeckerei-muenzel.de/wp-content/uploads/schulungsfilm-personalhygiene.mp4',
      type: 'video/mp4'
    }],
    controlBar: {
      playToggle: true,
      captionsButton: false,
      chaptersButton: false,            
      subtitlesButton: false,
      remainingTimeDisplay: true,
      progressControl: {
        seekBar: true
      },
      fullscreenToggle: true,
      playbackRateMenuButton: true,
    },
  },
  imgCourse: "",
  questions: [
    {
      idQuestion: "q1",
      imgQuestion: "",
      question: "Darf am Arbeitsplatz gegessen und geraucht?",
      answers: [
      "Ja, das ist kein Problem.",
      "Nein, in der Nähe von Lebensmitteln wird nicht gegessen oder geraucht.",
      "Nur wenn man Hunger hat",
      ],
      correctAnswer: 1
    },
    {
      idQuestion: "q2",
      imgQuestion: "",
      question: "Reicht es den Arbeitsplatz erst zum Schluss zu säubern?",
      answers: [
      "Ja, das reicht völlig aus.",
      "Der Arbeitsplatz muss immer hygienisch sauber und ordentlich sein.",
      "Der Arbeitsplatz muss alle 2 Stunden gereinigt werden.",
      ],
      correctAnswer: 1
    }
  ]
}
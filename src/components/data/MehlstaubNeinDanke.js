export const MehlstaubNeinDanke = {
  showing: 'video',
  courseId: "1003",
  title: {
    Schulung: "Mehlstaub nein danke",
    Training: "Flour dust - no thanks",
  },
  title_: "Mehlstaub nein danke",
  categories: ["Produktion"],
  instructions: {},
  video: {
    autoplay: false,
    controls: true,
    fluid: true,
    responsive: true,
    preload: 'auto', 
    poster: "https://baeckerei-muenzel.de/wp-content/uploads/poster-logo.jpg",
    sources: [{
      src: 'https://filme.baeckerei-muenzel.de/mehlstaub-nein-danke.mp4',
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
      imgQuestion: "/img/eins.jpg",
      question: "frage eins",
      answers: [
      "1 false",
      "16 false",
      "9 false",
      "correct 8",
      ],
      correctAnswer: 3
    }
  ]
}
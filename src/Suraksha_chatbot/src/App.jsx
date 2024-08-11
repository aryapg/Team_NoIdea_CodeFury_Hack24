import { useState } from "react";
import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [videos, setVideos] = useState([]);
  const [fetchingVideos, setFetchingVideos] = useState(false);

  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY; // Ensure this environment variable is set

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Loading your answer... \n It might take up to 10 seconds");
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
          import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
        }`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      setAnswer(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }

  async function fetchYouTubeVideos() {
    setFetchingVideos(true);
    try {
      const response = await axios({
        url: `https://www.googleapis.com/youtube/v3/search`,
        method: "get",
        params: {
          part: 'snippet',
          q: question,
          type: 'video',
          relevanceLanguage: 'en',
          maxResults: 5,
          key: API_KEY,
        }
      });

      if (response.data.items) {
        setVideos(response.data.items);
      } else {
        console.log("No videos found.");
        setVideos([]);
      }
    } catch (error) {
      console.log("Error fetching YouTube videos:", error);
      setVideos([]);
    }
    setFetchingVideos(false);
  }

  const goBack = () => {
    window.location.href = "http://localhost:3002/";
  };

  return (
    <>
      <div className="bg-gradient-to-r from-blue-100 to-blue-500 h-screen p-3 flex flex-col justify-center items-center">
        <form
          onSubmit={generateAnswer}
          className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 text-center rounded-lg shadow-lg bg-white py-6 px-4 transition-all duration-500 transform hover:scale-105"
        >
          <h1 className="text-4xl font-bold text-blue-700 mb-4">Suraksha Setu</h1>
          <textarea
            required
            className="border border-gray-300 rounded w-full my-2 min-h-fit p-3 transition-all duration-300 focus:border-blue-500 focus:shadow-lg"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything"
          ></textarea>
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className={`bg-blue-600 text-white p-3 rounded-md transition-all duration-300 ${
                generatingAnswer ? 'opacity-50 cursor-not-allowed' : ''
              } hover:bg-white hover:text-blue-600`}
              disabled={generatingAnswer}
            >
              Generate Answer
            </button>
            <button
              type="button"
              onClick={fetchYouTubeVideos}
              className={`bg-green-600 text-white p-3 rounded-md transition-all duration-300 ${
                fetchingVideos ? 'opacity-50 cursor-not-allowed' : ''
              } hover:bg-white hover:text-green-600`}
              disabled={fetchingVideos}
            >
              Suggest Videos
            </button>
          </div>
        </form>
        <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 text-center rounded-lg bg-white my-4 shadow-lg transition-all duration-500 transform hover:scale-105">
          <ReactMarkdown className="p-4">{answer}</ReactMarkdown>
        </div>

        {/* Go Back Button */}
        <button
          onClick={goBack}
          style={{
            padding: '15px 70px',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            transition: 'background-color 0.3s, color 0.3s, transform 0.3s',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            fontSize: '18px',
            fontWeight: 'bold',
            marginTop: '15px',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#fff';
            e.target.style.color = '#000';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#000';
            e.target.style.color = '#fff';
          }}
        >
          Go Back
        </button>

        {/* YouTube Videos Section */}
        {videos.length > 0 && (
          <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 text-center rounded-lg bg-white my-4 p-4 shadow-lg overflow-y-scroll max-h-96">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">Related YouTube Videos:</h2>
            {videos.map((video) => (
              <div key={video.id.videoId} className="mb-6">
                <a
                  href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    className="w-full rounded-lg mb-2 transition-transform duration-300 hover:scale-105"
                  />
                  <h3 className="text-lg font-semibold text-blue-600 transition-colors duration-300 hover:text-blue-800">{video.snippet.title}</h3>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;

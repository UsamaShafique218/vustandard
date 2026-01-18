import React, { useEffect, useState } from "react";

function AttempQuiz({ data, onReset }) {
  const { questions, category } = data;

  const MAX_QUESTIONS = 40;
  const quizQuestions = questions.slice(0, MAX_QUESTIONS);

  const totalTime = quizQuestions.length * 60;

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [seconds, setSeconds] = useState(totalTime);
  const [completed, setCompleted] = useState(false);

  // TIMER
  useEffect(() => {
    if (completed) return;

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [completed]);

  const handleSelect = (index) => {
    setAnswers({ ...answers, [current]: index });
  };

  const isLastQuestion = current === quizQuestions.length - 1;

  const score = quizQuestions.reduce((total, q, index) => {
    return answers[index] === q.correct ? total + 1 : total;
  }, 0);

  return (
    <div className="quiz_wrapper">
      {/* HEADER */}
      <div className="quiz_top">
        <span>{Math.floor(seconds / 60)}:{seconds % 60 < 10 ? "0" : ""}{seconds % 60}</span>
        <span>{current + 1}/{quizQuestions.length}</span>
      </div>

      {/* BODY */}
      {!completed ? (
        <>
          <h5 className="mb-3">{category}</h5>
          <h4>{quizQuestions[current].question}</h4>

          <div className="quiz_options">
            {quizQuestions[current].options.map((opt, index) => (
              <label key={index} className={`option ${answers[current] === index ? "active" : ""}`}>
                <input
                  type="radio"
                  checked={answers[current] === index}
                  onChange={() => handleSelect(index)}
                />
                {opt}
              </label>
            ))}
          </div>

          <div className="quiz_footer">
            <button disabled={current === 0} onClick={() => setCurrent(current - 1)}>
              Prev
            </button>

            <button
              disabled={answers[current] === undefined}
              onClick={() => {
                if (isLastQuestion) {
                  setCompleted(true);
                } else {
                  setCurrent(current + 1);
                }
              }}
            >
              {isLastQuestion ? "Finish Quiz" : "Next"}
            </button>
          </div>
        </>
      ) : (
        // RESULT SCREEN
        <div className="quiz_result_screen text-center">
          <h3>Quiz Completed 🎉</h3>
          <p className="mt-2">
            Your Score: <strong>{score} / {quizQuestions.length}</strong>
          </p>

          <button className="all_btn mt-3" onClick={onReset}>
            Reset Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default AttempQuiz;

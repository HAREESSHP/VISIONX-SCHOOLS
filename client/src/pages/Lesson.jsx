import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getLesson } from '../services/lessonService';
import { saveProgress } from '../services/progressService';
import Loader from '../components/Loader';

const STEPS = ['introduction', 'learn', 'listen', 'practice', 'speak', 'quiz', 'reward'];

export default function Lesson() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [learnIndex, setLearnIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const data = await getLesson(id);
        setLesson(data.lesson);
      } catch (err) {
        setError(err.message || 'Failed to load lesson');
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  const stepNames = {
    introduction: 'Introduction',
    learn: 'Learn',
    listen: 'Listen',
    practice: 'Practice',
    speak: 'Speak',
    quiz: 'Quiz',
    reward: 'Reward'
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLearnNext = () => {
    if (learnIndex < (lesson?.content?.learn?.length || 0) - 1) {
      setLearnIndex(learnIndex + 1);
    } else {
      handleNext();
    }
  };

  const handleLearnPrev = () => {
    if (learnIndex > 0) {
      setLearnIndex(learnIndex - 1);
    } else {
      handlePrev();
    }
  };

  const handleQuizAnswer = (questionIndex, answerIndex) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionIndex]: answerIndex
    });
  };

  const handleQuizSubmit = async () => {
    const questions = lesson?.content?.listen?.questions || [];
    let correct = 0;
    const results = [];

    questions.forEach((q, i) => {
      const isCorrect = quizAnswers[i] === q.answer;
      if (isCorrect) correct++;
      results.push({
        questionIndex: i,
        selectedAnswer: quizAnswers[i],
        correct: isCorrect
      });
    });

    const score = Math.round((correct / questions.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);

    // Save progress
    setSaving(true);
    try {
      await saveProgress({
        lessonId: id,
        status: 'completed',
        score,
        quizResults: results
      });
    } catch (err) {
      console.error('Failed to save progress:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  const handleFinish = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return <Loader text="Loading lesson... 📚" />;
  }

  if (error || !lesson) {
    return (
      <div className="empty-state">
        <div className="empty-icon">😕</div>
        <h2>Lesson not found</h2>
        <p>{error || 'This lesson is not available.'}</p>
        <Link to="/dashboard" className="btn btn-primary">Back to Dashboard</Link>
      </div>
    );
  }

  const step = STEPS[currentStep];
  const learnItems = lesson.content?.learn || [];
  const currentLearn = learnItems[learnIndex];
  const questions = lesson.content?.listen?.questions || [];

  return (
    <div className="lesson-page">
      {/* Lesson Header */}
      <div className="lesson-header">
        <div className="lesson-header-top">
          <button className="btn btn-ghost btn-small" onClick={() => navigate('/dashboard')}>
            ← Back
          </button>
          <div className="lesson-breadcrumb">
            <span>{lesson.areaIcon} {lesson.area}</span>
            <span className="breadcrumb-sep">›</span>
            <span>{lesson.title}</span>
          </div>
          <div className="lesson-duration">⏱ {lesson.duration}</div>
        </div>

        {/* Progress Steps */}
        <div className="lesson-steps">
          {STEPS.map((s, i) => (
            <div
              key={s}
              className={`lesson-step ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'completed' : ''}`}
            >
              <div className="step-dot">
                {i < currentStep ? '✓' : i + 1}
              </div>
              <span className="step-label">{stepNames[s]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lesson Content */}
      <div className="lesson-content">
        {/* Introduction Step */}
        {step === 'introduction' && (
          <div className="lesson-step-content intro-step">
            <div className="step-emoji">{lesson.icon}</div>
            <h2 className="step-title">{lesson.title}</h2>
            <p className="step-topic">{lesson.topic}</p>
            <div className="intro-card">
              <p>{lesson.content?.introduction}</p>
            </div>
            <div className="objectives-list">
              <h3>What you'll learn:</h3>
              <ul>
                {lesson.objectives?.map((obj, i) => (
                  <li key={i}>🎯 {obj}</li>
                ))}
              </ul>
            </div>
            <div className="step-actions">
              <button className="btn btn-primary btn-large" onClick={handleNext}>
                Start Learning →
              </button>
            </div>
          </div>
        )}

        {/* Learn Step */}
        {step === 'learn' && (
          <div className="lesson-step-content learn-step">
            <h2 className="step-title">Learn 📚</h2>
            {currentLearn && (
              <div className="learn-card">
                <div className="learn-emoji">{currentLearn.emoji || '📖'}</div>
                <h3 className="learn-word">{currentLearn.word}</h3>
                {currentLearn.pronunciation && (
                  <div className="learn-pronunciation">
                    <span>🔊</span> "{currentLearn.pronunciation}"
                  </div>
                )}
                <p className="learn-meaning">{currentLearn.meaning}</p>
                {currentLearn.example && (
                  <div className="learn-example">
                    <strong>Example:</strong> "{currentLearn.example}"
                  </div>
                )}
              </div>
            )}
            <div className="learn-nav">
              <button
                className="btn btn-outline"
                onClick={handleLearnPrev}
                disabled={learnIndex === 0 && currentStep === 0}
              >
                ← Previous
              </button>
              <div className="learn-counter">
                {learnIndex + 1} / {learnItems.length}
              </div>
              <button className="btn btn-primary" onClick={handleLearnNext}>
                {learnIndex < learnItems.length - 1 ? 'Next Word →' : 'Continue →'}
              </button>
            </div>
          </div>
        )}

        {/* Listen Step */}
        {step === 'listen' && (
          <div className="lesson-step-content listen-step">
            <h2 className="step-title">Listen 🎧</h2>
            <div className="listen-card">
              <div className="listen-icon">🎧</div>
              <p className="listen-text">"{lesson.content?.listen?.text}"</p>
              <button className="btn btn-primary" onClick={() => {
                if ('speechSynthesis' in window) {
                  const utterance = new SpeechSynthesisUtterance(lesson.content?.listen?.text);
                  utterance.lang = 'en-US';
                  utterance.rate = 0.9;
                  window.speechSynthesis.cancel();
                  window.speechSynthesis.speak(utterance);
                }
              }}>
                🔊 Play
              </button>
            </div>
            <div className="step-actions">
              <button className="btn btn-outline" onClick={handlePrev}>← Back</button>
              <button className="btn btn-primary" onClick={handleNext}>Continue →</button>
            </div>
          </div>
        )}

        {/* Practice Step */}
        {step === 'practice' && (
          <div className="lesson-step-content practice-step">
            <h2 className="step-title">Practice 💪</h2>
            <div className="practice-card">
              <div className="practice-icon">🗣️</div>
              <p className="practice-text">{lesson.content?.practice}</p>
              <button className="btn btn-primary" onClick={() => {
                if ('speechSynthesis' in window) {
                  const utterance = new SpeechSynthesisUtterance(lesson.content?.practice);
                  utterance.lang = 'en-US';
                  utterance.rate = 0.9;
                  window.speechSynthesis.cancel();
                  window.speechSynthesis.speak(utterance);
                }
              }}>
                🔊 Listen to Practice
              </button>
            </div>
            <div className="step-actions">
              <button className="btn btn-outline" onClick={handlePrev}>← Back</button>
              <button className="btn btn-primary" onClick={handleNext}>Continue →</button>
            </div>
          </div>
        )}

        {/* Speak Step */}
        {step === 'speak' && (
          <div className="lesson-step-content speak-step">
            <h2 className="step-title">Speak 🎤</h2>
            <div className="speak-card">
              <div className="speak-icon">🎤</div>
              <p className="speak-text">{lesson.content?.speak}</p>
              <div className="speak-controls">
                {!isRecording ? (
                  <button className="btn btn-primary btn-large" onClick={handleStartRecording}>
                    🎤 Start Speaking
                  </button>
                ) : (
                  <div className="recording-indicator">
                    <div className="recording-pulse"></div>
                    <span>Recording...</span>
                    <button className="btn btn-danger" onClick={handleStopRecording}>
                      ⏹ Stop
                    </button>
                  </div>
                )}
              </div>
              {!isRecording && (
                <p className="speak-hint">Practice saying the sentences out loud. You can record yourself!</p>
              )}
            </div>
            <div className="step-actions">
              <button className="btn btn-outline" onClick={handlePrev}>← Back</button>
              <button className="btn btn-primary" onClick={handleNext}>Continue →</button>
            </div>
          </div>
        )}

        {/* Quiz Step */}
        {step === 'quiz' && (
          <div className="lesson-step-content quiz-step">
            <h2 className="step-title">Quiz 📝</h2>
            <p className="step-subtitle">Answer the questions to complete the lesson!</p>

            {questions.map((q, qIndex) => (
              <div key={qIndex} className="quiz-question">
                <h3 className="quiz-question-text">
                  {qIndex + 1}. {q.question}
                </h3>
                <div className="quiz-options">
                  {q.options.map((option, oIndex) => {
                    let optionClass = 'quiz-option';
                    if (quizSubmitted) {
                      if (oIndex === q.answer) {
                        optionClass += ' correct';
                      } else if (quizAnswers[qIndex] === oIndex) {
                        optionClass += ' wrong';
                      }
                    } else if (quizAnswers[qIndex] === oIndex) {
                      optionClass += ' selected';
                    }
                    return (
                      <button
                        key={oIndex}
                        className={optionClass}
                        onClick={() => !quizSubmitted && handleQuizAnswer(qIndex, oIndex)}
                        disabled={quizSubmitted}
                      >
                        <span className="option-letter">
                          {String.fromCharCode(65 + oIndex)}
                        </span>
                        {option}
                        {quizSubmitted && oIndex === q.answer && <span className="option-check">✓</span>}
                        {quizSubmitted && quizAnswers[qIndex] === oIndex && oIndex !== q.answer && <span className="option-x">✗</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {!quizSubmitted ? (
              <div className="step-actions">
                <button className="btn btn-outline" onClick={handlePrev}>← Back</button>
                <button
                  className="btn btn-primary btn-large"
                  onClick={handleQuizSubmit}
                  disabled={Object.keys(quizAnswers).length < questions.length || saving}
                >
                  {saving ? 'Saving...' : 'Submit Answers'}
                </button>
              </div>
            ) : (
              <div className="quiz-result">
                <div className="quiz-score">
                  <div className="score-circle" style={{ '--score': `${quizScore * 3.6}deg` }}>
                    <span>{quizScore}%</span>
                  </div>
                  <h3>
                    {quizScore >= 80 ? 'Excellent! 🏆' :
                     quizScore >= 60 ? 'Great Job! 🌟' :
                     quizScore >= 40 ? 'Good Try! 💪' : 'Keep Practicing! 📚'}
                  </h3>
                  <p>
                    You got {questions.filter((q, i) => quizAnswers[i] === q.answer).length} out of {questions.length} correct!
                  </p>
                </div>
                <div className="step-actions">
                  <button className="btn btn-primary btn-large" onClick={handleNext}>
                    See Your Reward →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Reward Step */}
        {step === 'reward' && (
          <div className="lesson-step-content reward-step">
            <div className="reward-card">
              <div className="reward-emoji">🏆</div>
              <h2 className="reward-title">Lesson Complete!</h2>
              <p className="reward-text">
                Great job, {user.name?.split(' ')[0]}! You've completed "{lesson.title}"
              </p>
              <div className="reward-stats">
                <div className="reward-stat">
                  <span className="reward-stat-icon">⭐</span>
                  <strong>+50 XP</strong>
                  <small>Earned</small>
                </div>
                <div className="reward-stat">
                  <span className="reward-stat-icon">📊</span>
                  <strong>{quizScore}%</strong>
                  <small>Quiz Score</small>
                </div>
                <div className="reward-stat">
                  <span className="reward-stat-icon">🔥</span>
                  <strong>+1</strong>
                  <small>Day Streak</small>
                </div>
              </div>
              <div className="reward-message">
                Keep going! You're getting better every day! 💪
              </div>
              <div className="step-actions">
                <button className="btn btn-primary btn-large" onClick={handleFinish}>
                  Back to Dashboard 🚀
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
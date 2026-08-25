import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getLesson } from '../services/lessonService';
import { saveProgress } from '../services/progressService';
import Loader from '../components/Loader';
import TiltCard from '../components/TiltCard';
import Lesson3DVisual from '../components/Lesson3DVisual';
import { 
  Volume2, Mic, CheckCircle, ArrowLeft, ArrowRight, 
  Sparkles, Award, Star, Flame, RotateCcw, Play, Check 
} from 'lucide-react';

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
    introduction: 'Intro',
    learn: 'Learn',
    listen: 'Listen',
    practice: 'Practice',
    speak: 'Speak',
    quiz: 'Quiz',
    reward: 'Mastery'
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

  const playTTS = (text) => {
    if ('speechSynthesis' in window && text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  if (loading) {
    return <Loader text="Preparing your interactive 3D classroom... 📖" />;
  }

  if (error || !lesson) {
    return (
      <div className="empty-state">
        <div className="empty-icon">😕</div>
        <h2>Lesson not available</h2>
        <p>{error || 'The requested lesson could not be loaded.'}</p>
        <Link to="/dashboard" className="btn btn-primary">Return to Dashboard</Link>
      </div>
    );
  }

  const step = STEPS[currentStep];
  const learnItems = lesson.content?.learn || [];
  const currentLearn = learnItems[learnIndex];
  const questions = lesson.content?.listen?.questions || [];

  return (
    <div className="lesson-experience-page">
      {/* 1. Header Navigation Bar */}
      <div className="lesson-nav-header">
        <div className="lesson-nav-top">
          <button className="lesson-back-btn" onClick={() => navigate('/dashboard')}>
            <ArrowLeft size={16} />
            <span>Dashboard</span>
          </button>
          <div className="lesson-nav-meta">
            <span className="lesson-topic-chip">{lesson.areaIcon} {lesson.area}</span>
            <span className="lesson-sep">•</span>
            <strong className="lesson-header-title">{lesson.title}</strong>
          </div>
          <div className="lesson-duration-badge">⏱ {lesson.duration || '10 mins'}</div>
        </div>

        {/* 3D Segmented Stepper */}
        <div className="lesson-stepper-track">
          {STEPS.map((s, i) => (
            <div
              key={s}
              className={`stepper-node ${i === currentStep ? 'is-active' : ''} ${i < currentStep ? 'is-done' : ''}`}
              onClick={() => {
                if (i <= currentStep) setCurrentStep(i);
              }}
            >
              <div className="stepper-bubble">
                {i < currentStep ? <Check size={14} /> : i + 1}
              </div>
              <span className="stepper-label">{stepNames[s]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Step Animated Content Container */}
      <div className="lesson-body-container">
        <AnimatePresence mode="wait">
          {/* STEP 1: INTRODUCTION */}
          {step === 'introduction' && (
            <motion.div
              key="intro"
              className="lesson-step-wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              <TiltCard maxAngle={6} scale={1.01} borderRadius="26px" className="lesson-content-card">
                <div className="step-badge-pill">
                  <Sparkles size={16} />
                  <span>Module Overview</span>
                </div>
                <div className="step-emoji-avatar">{lesson.icon || '🌟'}</div>
                <h1 className="step-main-title">{lesson.title}</h1>
                <p className="step-topic-name">{lesson.topic}</p>

                <div className="lesson-intro-box">
                  <p>{lesson.content?.introduction}</p>
                </div>

                {lesson.objectives && (
                  <div className="lesson-objectives-box">
                    <h3>Learning Objectives</h3>
                    <ul>
                      {lesson.objectives.map((obj, i) => (
                        <li key={i}>
                          <CheckCircle size={18} className="objective-check" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="step-action-row">
                  <motion.button 
                    className="btn btn-primary btn-large step-next-btn"
                    onClick={handleNext}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Start Learning Vocabulary →
                  </motion.button>
                </div>
              </TiltCard>
            </motion.div>
          )}

          {/* STEP 2: LEARN VOCABULARY */}
          {step === 'learn' && (
            <motion.div
              key="learn"
              className="lesson-step-wrapper"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
            >
              {currentLearn && (
                <TiltCard maxAngle={8} scale={1.02} borderRadius="26px" className="lesson-content-card vocab-card-3d">
                  <div className="card-top-indicator">
                    <span className="vocab-counter">Card {learnIndex + 1} of {learnItems.length}</span>
                    <button className="audio-tts-btn" onClick={() => playTTS(currentLearn.word)}>
                      <Volume2 size={20} />
                      <span>Hear Word</span>
                    </button>
                  </div>

                  <div className="vocab-emoji-hero">{currentLearn.emoji || '📖'}</div>
                  <h2 className="vocab-word-title">{currentLearn.word}</h2>
                  
                  {currentLearn.pronunciation && (
                    <div className="vocab-phonetic-badge">
                      <span>Phonetic:</span> "{currentLearn.pronunciation}"
                    </div>
                  )}

                  <div className="vocab-meaning-card">
                    <strong>Definition:</strong>
                    <p>{currentLearn.meaning}</p>
                  </div>

                  {currentLearn.example && (
                    <div className="vocab-example-card">
                      <strong>Context Example:</strong>
                      <p>"{currentLearn.example}"</p>
                      <button className="example-audio-btn" onClick={() => playTTS(currentLearn.example)}>
                        <Volume2 size={16} />
                        <span>Listen to sentence</span>
                      </button>
                    </div>
                  )}

                  <div className="vocab-nav-bar">
                    <button
                      className="btn btn-outline"
                      onClick={handleLearnPrev}
                      disabled={learnIndex === 0 && currentStep === 0}
                    >
                      ← Previous
                    </button>
                    <button className="btn btn-primary" onClick={handleLearnNext}>
                      {learnIndex < learnItems.length - 1 ? 'Next Word →' : 'Proceed to Listening →'}
                    </button>
                  </div>
                </TiltCard>
              )}
            </motion.div>
          )}

          {/* STEP 3: LISTEN */}
          {step === 'listen' && (
            <motion.div
              key="listen"
              className="lesson-step-wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              <TiltCard maxAngle={6} scale={1.01} borderRadius="26px" className="lesson-content-card">
                <div className="step-badge-pill">
                  <Volume2 size={16} />
                  <span>Comprehension Listening</span>
                </div>
                <h2 className="step-main-title mt-2">Listen & Comprehend 🎧</h2>
                <p className="step-topic-name">Listen attentively to the audio track below and follow the pronunciation.</p>

                <div className="listen-audio-stage">
                  <div className="listen-3d-visual-wrapper">
                    <Lesson3DVisual isSpeaking={true} isRecording={false} />
                  </div>

                  <p className="listen-dialogue-text">"{lesson.content?.listen?.text}"</p>

                  <motion.button 
                    className="play-speech-btn"
                    onClick={() => playTTS(lesson.content?.listen?.text)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Volume2 size={22} />
                    <span>Play Audio Narration</span>
                  </motion.button>
                </div>

                <div className="step-action-row split">
                  <button className="btn btn-outline" onClick={handlePrev}>← Back</button>
                  <button className="btn btn-primary btn-large" onClick={handleNext}>Proceed to Practice →</button>
                </div>
              </TiltCard>
            </motion.div>
          )}

          {/* STEP 4: PRACTICE */}
          {step === 'practice' && (
            <motion.div
              key="practice"
              className="lesson-step-wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              <TiltCard maxAngle={6} scale={1.01} borderRadius="26px" className="lesson-content-card">
                <div className="step-badge-pill">
                  <Sparkles size={16} />
                  <span>Guided Exercise</span>
                </div>
                <h2 className="step-main-title mt-2">Classroom Practice Drills 💪</h2>
                <p className="step-topic-name">Repeat and rehearse the sentence structure aloud.</p>

                <div className="practice-prompt-box">
                  <span className="prompt-icon">🗣️</span>
                  <p className="practice-sentence">{lesson.content?.practice}</p>
                  
                  <button className="audio-tts-btn mt-3" onClick={() => playTTS(lesson.content?.practice)}>
                    <Volume2 size={18} />
                    <span>Listen to Model Pronunciation</span>
                  </button>
                </div>

                <div className="step-action-row split">
                  <button className="btn btn-outline" onClick={handlePrev}>← Back</button>
                  <button className="btn btn-primary btn-large" onClick={handleNext}>Proceed to Speaking →</button>
                </div>
              </TiltCard>
            </motion.div>
          )}

          {/* STEP 5: SPEAK & RECORD */}
          {step === 'speak' && (
            <motion.div
              key="speak"
              className="lesson-step-wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              <TiltCard maxAngle={6} scale={1.01} borderRadius="26px" className="lesson-content-card">
                <div className="step-badge-pill">
                  <Mic size={16} />
                  <span>Voice AI Evaluation</span>
                </div>
                <h2 className="step-main-title mt-2">Your Turn to Speak! 🎤</h2>
                <p className="step-topic-name">Click the microphone below and speak clearly into your device.</p>

                <div className="speaking-challenge-card">
                  <div className="speak-3d-visual-container">
                    <Lesson3DVisual isRecording={isRecording} isSpeaking={false} />
                  </div>

                  <p className="speaking-prompt-target">"{lesson.content?.speak}"</p>

                  <div className="mic-interactive-center">
                    <motion.button 
                      className={`mic-record-orb ${isRecording ? 'is-recording' : ''}`}
                      onClick={() => setIsRecording(!isRecording)}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.94 }}
                    >
                      <Mic size={32} />
                      {isRecording && <div className="recording-wave-ring" />}
                    </motion.button>
                    <span className="mic-status-label">
                      {isRecording ? 'Listening... Speak now!' : 'Click to start speaking'}
                    </span>
                  </div>
                </div>

                <div className="step-action-row split">
                  <button className="btn btn-outline" onClick={handlePrev}>← Back</button>
                  <button className="btn btn-primary btn-large" onClick={handleNext}>Continue to Quiz →</button>
                </div>
              </TiltCard>
            </motion.div>
          )}

          {/* STEP 6: QUIZ */}
          {step === 'quiz' && (
            <motion.div
              key="quiz"
              className="lesson-step-wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              <TiltCard maxAngle={6} scale={1.01} borderRadius="26px" className="lesson-content-card">
                <div className="step-badge-pill">
                  <Award size={16} />
                  <span>Knowledge Check</span>
                </div>
                <h2 className="step-main-title mt-2">Lesson Assessment Quiz 📝</h2>
                <p className="step-topic-name">Test your understanding of the concepts covered in this module.</p>

                <div className="quiz-questions-list">
                  {questions.map((q, qIndex) => (
                    <div key={qIndex} className="quiz-question-box">
                      <h4 className="question-text">
                        <span className="q-number">Q{qIndex + 1}.</span> {q.question}
                      </h4>

                      <div className="quiz-options-grid">
                        {q.options?.map((opt, optIndex) => {
                          const isSelected = quizAnswers[qIndex] === optIndex;
                          const isCorrect = quizSubmitted && optIndex === q.answer;
                          const isWrong = quizSubmitted && isSelected && !isCorrect;

                          return (
                            <button
                              key={optIndex}
                              type="button"
                              className={`quiz-option-btn ${isSelected ? 'selected' : ''} ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                              onClick={() => !quizSubmitted && handleQuizAnswer(qIndex, optIndex)}
                              disabled={quizSubmitted}
                            >
                              <span className="option-letter">{String.fromCharCode(65 + optIndex)}</span>
                              <span className="option-label">{opt}</span>
                              {isCorrect && <Check size={18} className="option-status-icon text-success" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="step-action-row split">
                  <button className="btn btn-outline" onClick={handlePrev} disabled={quizSubmitted}>← Back</button>
                  {!quizSubmitted ? (
                    <button 
                      className="btn btn-primary btn-large"
                      onClick={handleQuizSubmit}
                      disabled={saving || Object.keys(quizAnswers).length < questions.length}
                    >
                      {saving ? 'Evaluating...' : 'Submit Answers & Calculate Score →'}
                    </button>
                  ) : (
                    <button className="btn btn-primary btn-large" onClick={handleNext}>
                      View Mastery Reward →
                    </button>
                  )}
                </div>
              </TiltCard>
            </motion.div>
          )}

          {/* STEP 7: REWARD & COMPLETION */}
          {step === 'reward' && (
            <motion.div
              key="reward"
              className="lesson-step-wrapper"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <TiltCard maxAngle={8} scale={1.02} borderRadius="28px" className="lesson-content-card text-center reward-card-3d">
                <div className="reward-trophy-hero">🏆</div>
                <div className="reward-congrats-badge">
                  <Sparkles size={18} />
                  <span>Module Completed!</span>
                </div>
                <h1 className="step-main-title mt-3">Outstanding Effort, {user.name?.split(' ')[0]}!</h1>
                <p className="step-topic-name">You have completed all milestones for "{lesson.title}".</p>

                <div className="reward-stats-grid">
                  <div className="reward-stat-box">
                    <Star size={24} className="reward-icon-gold" />
                    <strong>+50 XP</strong>
                    <span>Experience Earned</span>
                  </div>
                  <div className="reward-stat-box">
                    <Award size={24} className="reward-icon-terracotta" />
                    <strong>{quizScore}%</strong>
                    <span>Quiz Accuracy</span>
                  </div>
                  <div className="reward-stat-box">
                    <Flame size={24} className="reward-icon-flame" />
                    <strong>Active</strong>
                    <span>Daily Streak Kept</span>
                  </div>
                </div>

                <div className="reward-actions mt-4">
                  <motion.button
                    className="btn btn-primary btn-large"
                    onClick={() => navigate('/dashboard')}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Return to Student Dashboard →
                  </motion.button>
                </div>
              </TiltCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
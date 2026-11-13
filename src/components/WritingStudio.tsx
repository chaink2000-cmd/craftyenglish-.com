import React, { useState } from 'react';
import { 
  PenTool, 
  Sparkles, 
  ThumbsUp, 
  MessageSquare, 
  Send, 
  Share2,
  AlertCircle
} from 'lucide-react';
import { analyzeReadability } from '../utils/readability';
import { COMMUNITY_STORIES } from '../data/communityData';
import { CommunityStory } from '../types';
import { audioFeedback } from '../utils/audioFeedback';

interface WritingStudioProps {
  onAddXP: (xp: number) => void;
}

export const WritingStudio: React.FC<WritingStudioProps> = ({ onAddXP }) => {
  const [activeTab, setActiveTab] = useState<'editor' | 'showcase'>('editor');

  // Manuscript Editor State
  const [manuscriptTitle, setManuscriptTitle] = useState(
    'The Dialectics of Solitude: Analyzing Keats’s Odes'
  );
  const [manuscriptContent, setManuscriptContent] = useState(
    `When John Keats stood before the cold marble urn in 1819, he did not merely contemplate an archaeological relic; he confronted the eternal paradox of art and mortality. 

The Grecian Urn preserves passion by freezing it. The bold lover can never kiss his beloved, yet she cannot fade. In this sublime suspension of time, Keats articulates what Theodor Adorno would later designate as the autonomous work of art—a silent monument resisting the ephemeral currents of history. 

Through chiasmus and negative capability, the poem resolves its agony in the famous concluding aphorism: Beauty is truth, truth beauty.`
  );
  const [selectedGenre, setSelectedGenre] = useState<
    'Essay' | 'Literature Critique' | 'Creative Fiction' | 'Poetry' | 'NET Model Answer'
  >('Literature Critique');

  // Community Stories State
  const [stories, setStories] = useState<CommunityStory[]>(COMMUNITY_STORIES);
  const [genreFilter, setGenreFilter] = useState<string>('All');
  const [expandedStoryId, setExpandedStoryId] = useState<string | null>(stories[0].id);
  const [newCommentText, setNewCommentText] = useState('');

  // Live Readability Metrics
  const metrics = analyzeReadability(manuscriptContent);

  // Upvote Handler
  const handleUpvote = (id: string) => {
    audioFeedback.playSuccess();
    setStories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, upvotes: s.upvotes + 1 } : s))
    );
  };

  // Publish Story Handler
  const handlePublish = () => {
    if (!manuscriptTitle.trim() || !manuscriptContent.trim()) return;
    audioFeedback.playFanfare();
    onAddXP(100);

    const newStory: CommunityStory = {
      id: `story-${Date.now()}`,
      title: manuscriptTitle,
      author: 'You (Scholar)',
      authorBadge: 'Senior Contributor',
      date: 'Just now',
      genre: selectedGenre,
      content: manuscriptContent,
      readabilityScore: metrics.fleschReadingEase,
      upvotes: 1,
      comments: [],
    };

    setStories([newStory, ...stories]);
    setExpandedStoryId(newStory.id);
    setActiveTab('showcase');
  };

  // Comment Submit Handler
  const handleAddComment = (storyId: string) => {
    if (!newCommentText.trim()) return;
    audioFeedback.playClick();

    setStories((prev) =>
      prev.map((s) => {
        if (s.id === storyId) {
          return {
            ...s,
            comments: [
              ...s.comments,
              {
                id: `c-${Date.now()}`,
                author: 'You (Scholar)',
                avatar: 'YS',
                timestamp: 'Just now',
                comment: newCommentText,
              },
            ],
          };
        }
        return s;
      })
    );
    setNewCommentText('');
  };

  const filteredStories = stories.filter(
    (s) => genreFilter === 'All' || s.genre === genreFilter
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-sky-50 to-blue-100/75 border border-sky-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-indigo-700 text-xs font-semibold">
              <PenTool className="w-3.5 h-3.5" />
              <span>The Manuscript Hub · Community Review</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Writing Studio & Portfolio Hub
            </h1>
            <p className="text-slate-600 text-sm max-w-2xl font-sans">
              Draft critical dissertations and creative prose with real-time Flesch-Kincaid index metering, passive voice detection, and peer showcase publishing.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-sky-200 shadow-xs self-start md:self-auto">
            <button
              onClick={() => {
                audioFeedback.playClick();
                setActiveTab('editor');
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'editor'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-sky-700 hover:bg-sky-50'
              }`}
            >
              The Manuscript Editor
            </button>
            <button
              onClick={() => {
                audioFeedback.playClick();
                setActiveTab('showcase');
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'showcase'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-sky-700 hover:bg-sky-50'
              }`}
            >
              Peer Review Showcase ({stories.length})
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: MANUSCRIPT EDITOR */}
      {activeTab === 'editor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Writing Canvas */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-2xl border border-sky-200 p-6 space-y-4 shadow-sm">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <input
                  type="text"
                  value={manuscriptTitle}
                  onChange={(e) => setManuscriptTitle(e.target.value)}
                  placeholder="Manuscript Title or Essay Prompt..."
                  className="bg-sky-50 border border-sky-200 rounded-xl px-4 py-2.5 font-editorial text-lg text-slate-900 font-bold placeholder-slate-400 focus:outline-none focus:border-indigo-500 flex-1"
                />

                <select
                  value={selectedGenre}
                  onChange={(e) =>
                    setSelectedGenre(
                      e.target.value as
                        | 'Essay'
                        | 'Literature Critique'
                        | 'Creative Fiction'
                        | 'Poetry'
                        | 'NET Model Answer'
                    )
                  }
                  className="bg-sky-50 border border-sky-200 rounded-xl px-3 py-2 text-xs text-indigo-700 font-semibold focus:outline-none focus:border-indigo-500"
                >
                  <option value="Literature Critique">Literature Critique</option>
                  <option value="NET Model Answer">NET Model Answer</option>
                  <option value="Essay">Scholarly Essay</option>
                  <option value="Creative Fiction">Creative Fiction</option>
                  <option value="Poetry">Poetry Analysis</option>
                </select>
              </div>

              {/* Text Area */}
              <textarea
                value={manuscriptContent}
                onChange={(e) => setManuscriptContent(e.target.value)}
                rows={14}
                placeholder="Compose your essay or literary analysis here..."
                className="w-full bg-sky-50/75 border border-sky-200 rounded-xl p-5 font-serif text-slate-900 text-sm leading-relaxed placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
              />

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>{metrics.wordCount} words</span>
                  <span>•</span>
                  <span>{metrics.sentenceCount} sentences</span>
                  <span>•</span>
                  <span>{metrics.estimatedReadingTimeMinutes}m read</span>
                </div>

                <button
                  onClick={handlePublish}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition-all cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Publish to Community Showcase (+100 XP)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Readability Index & Diagnostic Radar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl border border-sky-200 p-5 space-y-5 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Readability & Syntactic Diagnostics</span>
              </h3>

              {/* Gauge */}
              <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-center space-y-2">
                <span className="text-[10px] font-bold uppercase text-slate-500 block">
                  Flesch Reading Ease
                </span>
                <p className="text-4xl font-black text-indigo-700">{metrics.fleschReadingEase}</p>
                <span className="text-xs font-semibold text-slate-700 block">
                  {metrics.complexityLevel}
                </span>
              </div>

              {/* Metric Items */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-sky-50/75 border border-sky-200">
                  <span className="text-slate-600">Flesch-Kincaid Grade:</span>
                  <span className="font-bold text-slate-900 font-mono">
                    Grade {metrics.fleschKincaidGrade}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-sky-50/75 border border-sky-200">
                  <span className="text-slate-600">Total Characters:</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {metrics.characterCount}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-sky-50/75 border border-sky-200">
                  <span className="text-slate-600">Average Syllables / Word:</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {metrics.wordCount > 0
                      ? (metrics.syllableCount / metrics.wordCount).toFixed(2)
                      : '0.00'}
                  </span>
                </div>
              </div>

              {/* Passive Voice Detector */}
              <div className="space-y-2 pt-2 border-t border-sky-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Passive Voice Occurrences ({metrics.passiveVoiceInstances.length})</span>
                  </span>
                </div>

                {metrics.passiveVoiceInstances.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">
                    No passive voice detected. Active syntax strengthens scholarly rigor.
                  </p>
                ) : (
                  <div className="space-y-1.5 max-h-40 overflow-y-auto">
                    {metrics.passiveVoiceInstances.map((inst, i) => (
                      <div
                        key={i}
                        className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-800 italic"
                      >
                        "{inst.sentence}"
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PEER REVIEW & SHOWCASE FEED */}
      {activeTab === 'showcase' && (
        <div className="space-y-6">
          {/* Genre Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {['All', 'Literature Critique', 'NET Model Answer', 'Essay', 'Creative Fiction'].map(
              (genre) => (
                <button
                  key={genre}
                  onClick={() => {
                    audioFeedback.playClick();
                    setGenreFilter(genre);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    genreFilter === genre
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-sky-700 bg-white border border-sky-200'
                  }`}
                >
                  {genre}
                </button>
              )
            )}
          </div>

          {/* Stories List */}
          <div className="grid grid-cols-1 gap-6">
            {filteredStories.map((story) => {
              const isExpanded = expandedStoryId === story.id;
              return (
                <div
                  key={story.id}
                  className="bg-white rounded-2xl border border-sky-200 p-6 space-y-4 shadow-sm"
                >
                  {/* Author bar */}
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-sky-600 flex items-center justify-center font-bold text-white text-xs">
                        {story.author.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">{story.author}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">
                            {story.authorBadge}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500">{story.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-50 text-slate-700 border border-sky-200 font-mono">
                        Ease: {story.readabilityScore}
                      </span>
                      <button
                        onClick={() => handleUpvote(story.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-indigo-700 border border-sky-200 text-xs font-bold transition-all cursor-pointer"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{story.upvotes}</span>
                      </button>
                    </div>
                  </div>

                  {/* Story Title & Content */}
                  <div>
                    <h3 className="font-editorial text-2xl font-bold text-slate-900 mb-2">
                      {story.title}
                    </h3>
                    <div className="font-serif text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {story.content}
                    </div>
                  </div>

                  {/* Comments Toggle & List */}
                  <div className="pt-4 border-t border-sky-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setExpandedStoryId(isExpanded ? null : story.id)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-800 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>
                          {story.comments.length} Peer Critiques & Annotations
                        </span>
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="space-y-3 pt-2 animate-in fade-in">
                        {story.comments.map((c) => (
                          <div
                            key={c.id}
                            className="p-3.5 rounded-xl bg-sky-50/75 border border-sky-200 space-y-1.5"
                          >
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-slate-900">{c.author}</span>
                              <span className="text-slate-500 text-[10px]">{c.timestamp}</span>
                            </div>
                            {c.highlightedText && (
                              <p className="text-[11px] text-amber-800 bg-amber-50 border-l-2 border-amber-500 pl-2 py-0.5 italic">
                                "{c.highlightedText}"
                              </p>
                            )}
                            <p className="text-xs text-slate-700 font-sans leading-relaxed">
                              {c.comment}
                            </p>
                          </div>
                        ))}

                        {/* Comment Input */}
                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="text"
                            value={newCommentText}
                            onChange={(e) => setNewCommentText(e.target.value)}
                            placeholder="Add scholarly critique or inline feedback..."
                            className="flex-1 bg-sky-50 border border-sky-200 rounded-xl px-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                          />
                          <button
                            onClick={() => handleAddComment(story.id)}
                            className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-all cursor-pointer"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, Users, BookOpen } from 'lucide-react';
import { GitHubCalendar } from 'react-github-calendar';

export default function GithubStats({ theme = 'dark' }) {
  const username = "govinddangi4564";

  const [stats, setStats] = useState({
    stars: 0,
    repos: 0,
    followers: 0,
    following: 0,
    languages: [],
    loading: true
  });

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch user data
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userRes.json();

        // Fetch repos data
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const reposData = await reposRes.json();

        // Calculate total stars and language distribution
        let totalStars = 0;
        const langCounts = {};
        let totalLangs = 0;

        reposData.forEach(repo => {
          totalStars += repo.stargazers_count || 0;

          if (repo.language) {
            langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
            totalLangs++;
          }
        });

        // Convert language object to array, sort by count, and calculate percentage
        const topLanguages = Object.entries(langCounts)
          .map(([name, count]) => ({
            name,
            percentage: Math.round((count / totalLangs) * 100),
            color: getLanguageColor(name)
          }))
          .sort((a, b) => b.percentage - a.percentage)
          .slice(0, 4); // Top 4 languages

        setStats({
          stars: totalStars,
          repos: userData.public_repos || 0,
          followers: userData.followers || 0,
          following: userData.following || 0,
          languages: topLanguages,
          loading: false
        });

      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchGitHubData();
  }, []);

  // Helper function for language colors
  const getLanguageColor = (lang) => {
    const colors = {
      JavaScript: '#f1e05a',
      Java: '#b07219',
      HTML: '#e34c26',
      CSS: '#563d7c',
      TypeScript: '#3178c6',
      Python: '#3572A5'
    };
    return colors[lang] || '#8b949e';
  };

  return (
    <section id="github" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <span className="section-tag">03. open source</span>
        <h2 className="section-title">GitHub Activity</h2>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
        {/* GitHub Stats Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full md:w-1/2 p-6 bg-card rounded-xl border border-[var(--border)] hover:border-accent/40 hover:shadow-[0_8px_30px_var(--card-hover-glow)] transition-all flex flex-col justify-center"
        >
          <div className="flex items-center gap-4 border-b border-[var(--border)] pb-4 mb-4">
            <img src={`https://github.com/${username}.png`} alt="Profile" className="w-12 h-12 rounded-full border border-[var(--border)]" />
            <div>
              <h3 className="text-text font-semibold text-lg">{username}</h3>
              <p className="text-slate-400 text-sm">Live GitHub Statistics</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-bg p-3 rounded-lg border border-[var(--border)] text-center flex flex-col items-center justify-center">
              <Star className="text-accent mb-2" size={20} />
              <div className="text-text text-2xl font-bold mb-1">{stats.loading ? "..." : stats.stars}</div>
              <div className="text-slate-400 text-xs uppercase tracking-wider font-mono">Total Stars</div>
            </div>
            <div className="bg-bg p-3 rounded-lg border border-[var(--border)] text-center flex flex-col items-center justify-center">
              <BookOpen className="text-accent2 mb-2" size={20} />
              <div className="text-text text-2xl font-bold mb-1">{stats.loading ? "..." : stats.repos}</div>
              <div className="text-slate-400 text-xs uppercase tracking-wider font-mono">Public Repos</div>
            </div>
            <div className="bg-bg p-3 rounded-lg border border-[var(--border)] text-center flex flex-col items-center justify-center">
              <Users className="text-accent3 mb-2" size={20} />
              <div className="text-text text-2xl font-bold mb-1">{stats.loading ? "..." : stats.followers}</div>
              <div className="text-slate-400 text-xs uppercase tracking-wider font-mono">Followers</div>
            </div>
            <div className="bg-bg p-3 rounded-lg border border-[var(--border)] text-center flex flex-col items-center justify-center">
              <GitFork className="text-purple-400 mb-2" size={20} />
              <div className="text-text text-2xl font-bold mb-1">{stats.loading ? "..." : stats.following}</div>
              <div className="text-slate-400 text-xs uppercase tracking-wider font-mono">Following</div>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="mt-6 pt-5 border-t border-[var(--border)]">
            <h4 className="text-text font-semibold text-lg mb-4">Achievements</h4>
            <div className="flex gap-4">
              <div className="relative group hover:-translate-y-1 transition-transform cursor-pointer" title="Pull Shark (x2)">
                <img src="https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png" alt="Pull Shark" className="w-[60px] h-[60px] rounded-full border-2 border-[var(--border)] bg-bg object-cover shadow-md" />
                <span className="absolute -bottom-1 -right-1 bg-[#ffb790] text-[#5a2000] text-[11px] font-bold px-1.5 py-0.5 rounded-full border-2 border-[var(--card)] z-10 shadow-sm">x2</span>
              </div>
              
              <div className="relative group hover:-translate-y-1 transition-transform cursor-pointer" title="YOLO">
                <img src="https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png" alt="YOLO" className="w-[60px] h-[60px] rounded-full border-2 border-[var(--border)] bg-bg object-cover shadow-md" />
              </div>
              
              <div className="relative group hover:-translate-y-1 transition-transform cursor-pointer" title="Quickdraw">
                <img src="https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png" alt="Quickdraw" className="w-[60px] h-[60px] rounded-full border-2 border-[var(--border)] bg-bg object-cover shadow-md" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Top Languages Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full md:w-1/2 p-6 bg-card rounded-xl border border-[var(--border)] hover:border-accent2/40 hover:shadow-[0_8px_30px_var(--accent2-soft-glow)] transition-all flex flex-col justify-center"
        >
          <h3 className="text-text font-semibold text-lg mb-6 border-b border-[var(--border)] pb-4">Most Used Languages</h3>

          <div className="flex flex-col gap-4">
            {stats.loading ? (
              <div className="text-slate-400 text-sm text-center py-4 animate-pulse">Loading languages...</div>
            ) : stats.languages.length > 0 ? (
              stats.languages.map((lang, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text font-mono">{lang.name}</span>
                    <span className="text-slate-400">{lang.percentage}%</span>
                  </div>
                  <div className="w-full bg-bg rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-slate-400 text-sm text-center py-4">No language data available.</div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Contribution Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6 w-full p-6 bg-card rounded-xl border border-[var(--border)] hover:border-accent/40 hover:shadow-[0_8px_30px_var(--card-hover-glow)] transition-all overflow-hidden flex flex-col items-center"
      >
        <h3 className="text-text font-semibold text-lg mb-6 w-full text-left border-b border-[var(--border)] pb-4">Contributions in the last year</h3>
        <div className="w-full overflow-x-auto pb-4 flex justify-start md:justify-center text-text">
          <div className="min-w-[750px] pr-4">
            <GitHubCalendar
              username={username}
              colorScheme={theme}
              blockSize={12}
              blockMargin={4}
              fontSize={14}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

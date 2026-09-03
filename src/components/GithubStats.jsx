import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, Users, BookOpen } from 'lucide-react';
import { GitHubCalendar } from 'react-github-calendar';

const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  TypeScript: '#3178c6',
  Python: '#3572A5',
};

function getLanguageColor(lang) {
  return LANGUAGE_COLORS[lang] || '#8b949e';
}

export default function GithubStats({ theme = 'dark' }) {
  const username = "govinddangi4564";


  const [stats, setStats] = useState(() => {
    try {
      const cached = localStorage.getItem(`github_stats_${username}`);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < 2 * 60 * 60 * 1000) {
          return { ...parsed.data, loading: false };
        }
      }
    } catch {
      // Ignore localStorage errors
    }
    return {
      stars: 6,
      repos: 18,
      followers: 12,
      following: 15,
      languages: [
        { name: "Java", percentage: 48, color: "#b07219" },
        { name: "JavaScript", percentage: 32, color: "#f1e05a" },
        { name: "Python", percentage: 12, color: "#3572A5" },
        { name: "HTML", percentage: 8, color: "#e34c26" },
      ],
      loading: true,
    };
  });

  useEffect(() => {
    let isMounted = true;

    const fetchGitHubData = async () => {
      try {
        // Check fresh cache
        const cached = localStorage.getItem(`github_stats_${username}`);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < 2 * 60 * 60 * 1000) {
            if (isMounted) {
              setStats({ ...parsed.data, loading: false });
            }
            return;
          }
        }

        // Fetch user data
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) throw new Error("User fetch failed");
        const userData = await userRes.json();

        // Fetch repos data
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        if (!reposRes.ok) throw new Error("Repos fetch failed");
        const reposData = await reposRes.json();

        // Calculate total stars and language distribution
        let totalStars = 0;
        const langCounts = {};
        let totalLangs = 0;

        reposData.forEach((repo) => {
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
            percentage: totalLangs > 0 ? Math.round((count / totalLangs) * 100) : 0,
            color: getLanguageColor(name),
          }))
          .sort((a, b) => b.percentage - a.percentage)
          .slice(0, 4);

        const newStats = {
          stars: totalStars,
          repos: userData.public_repos || 0,
          followers: userData.followers || 0,
          following: userData.following || 0,
          languages: topLanguages,
        };

        try {
          localStorage.setItem(
            `github_stats_${username}`,
            JSON.stringify({ data: newStats, timestamp: Date.now() })
          );
        } catch {
          // localStorage full or restricted
        }

        if (isMounted) {
          setStats({ ...newStats, loading: false });
        }
      } catch (error) {
        console.warn("GitHub API note (using fallback/cached data):", error.message);
        if (isMounted) {
          setStats((prev) => ({ ...prev, loading: false }));
        }
      }
    };

    fetchGitHubData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="github" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-pink" />
          <span className="font-mono text-[0.74rem] uppercase tracking-widest text-brand-pink font-semibold">
            04. proof of work
          </span>
        </div>
        <h2 className="font-syne text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Open Source &amp; Telemetry
        </h2>
        <p className="font-body text-[0.95rem] sm:text-[1.05rem] text-zinc-400 mt-2 max-w-2xl leading-relaxed">
          Real-time GitHub metrics, language distribution, and commit consistency directly from GitHub API.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-4 sm:gap-6 items-stretch mb-4 sm:mb-6">
        {/* GitHub Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="p-5 sm:p-7 rounded-2xl bg-zinc-900/60 border border-zinc-800/90 flex flex-col justify-between shadow-sm"
        >
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4 mb-5">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={`https://github.com/${username}.png`}
                  alt="Profile"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-zinc-700 shadow-md shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center flex-wrap gap-2">
                    <h3 className="text-white font-syne font-bold text-sm sm:text-base truncate">
                      @{username}
                    </h3>
                    <span className="font-mono text-[0.58rem] sm:text-[0.62rem] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-normal shrink-0">
                      Verified
                    </span>
                  </div>
                  <p className="text-zinc-500 font-mono text-[0.62rem] sm:text-[0.68rem] truncate">
                    Live GitHub API Telemetry
                  </p>
                </div>
              </div>

              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer rounded-lg bg-gradient-to-r from-brand-pink to-brand-purple p-[1px] hover:scale-[1.02] transition-all self-start sm:self-auto"
              >
                <div className="px-3.5 py-1.5 rounded-[7px] bg-zinc-950 text-white font-mono text-[0.68rem] sm:text-[0.72rem] uppercase font-bold group-hover:bg-gradient-to-r group-hover:from-brand-pink group-hover:to-brand-purple transition-all">
                  View Profile →
                </div>
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {[
                { label: 'Total Stars', val: stats.loading ? '...' : stats.stars, icon: Star, color: 'text-amber-400' },
                { label: 'Public Repos', val: stats.loading ? '...' : stats.repos, icon: BookOpen, color: 'text-purple-400' },
                { label: 'Followers', val: stats.loading ? '...' : stats.followers, icon: Users, color: 'text-brand-pink' },
                { label: 'Following', val: stats.loading ? '...' : stats.following, icon: GitFork, color: 'text-emerald-400' },
              ].map((item) => (
                <div key={item.label} className="p-3 sm:p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 text-center flex flex-col items-center justify-center">
                  <item.icon className={`${item.color} mb-1`} size={15} />
                  <div className="font-syne text-[1.2rem] sm:text-[1.45rem] font-bold text-white mb-0.5 leading-tight">{item.val}</div>
                  <div className="text-zinc-500 text-[0.58rem] sm:text-[0.64rem] uppercase tracking-wider font-mono">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div className="mt-4 pt-4 border-t border-zinc-800">
            <h4 className="text-white font-syne text-[0.82rem] sm:text-[0.9rem] font-bold mb-3 flex items-center gap-2">
              <span>GitHub Achievements</span>
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {[
                { name: 'Pull Shark (x2)', src: 'https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png', badge: 'x2' },
                { name: 'YOLO', src: 'https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png' },
                { name: 'Quickdraw', src: 'https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png' },
              ].map((ach) => (
                <div
                  key={ach.name}
                  className="relative group hover:-translate-y-1 transition-transform cursor-pointer p-1.5 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center gap-2"
                  title={ach.name}
                >
                  <img src={ach.src} alt={ach.name} className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-cover" />
                  <span className="font-mono text-[0.62rem] sm:text-[0.68rem] text-zinc-300 font-medium pr-1">{ach.name}</span>
                  {ach.badge && (
                    <span className="bg-amber-400 text-black text-[8px] sm:text-[9px] font-bold px-1.5 py-0.2 rounded-full shadow-sm">
                      {ach.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Top Languages Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="p-5 sm:p-7 rounded-2xl bg-zinc-900/60 border border-zinc-800/90 flex flex-col justify-between shadow-sm"
        >
          <div>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-5">
              <h3 className="text-white font-syne font-bold text-sm sm:text-base">Top Repository Languages</h3>
              <span className="font-mono text-[0.6rem] sm:text-[0.65rem] text-zinc-500">Dynamic Analysis</span>
            </div>

            <div className="flex flex-col gap-3 sm:gap-4">
              {stats.loading ? (
                <div className="text-zinc-500 text-xs sm:text-sm text-center py-4 sm:py-6 animate-pulse font-mono">
                  Querying language telemetry...
                </div>
              ) : stats.languages.length > 0 ? (
                stats.languages.map((lang) => (
                  <div key={lang.name}>
                    <div className="flex justify-between font-mono text-[0.7rem] sm:text-[0.78rem] mb-1.5">
                      <span className="text-white font-medium flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                        {lang.name}
                      </span>
                      <span className="text-zinc-400 font-bold">{lang.percentage}%</span>
                    </div>
                    <div className="w-full bg-zinc-950 rounded-full h-1.5 sm:h-2 border border-zinc-800 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-zinc-500 text-xs sm:text-sm text-center py-3">No language data available.</div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800 mt-4 flex items-center justify-between">
            <span className="font-mono text-[0.62rem] sm:text-[0.68rem] text-zinc-500">Primary Stack:</span>
            <span className="cyber-badge text-[0.58rem] sm:text-[0.62rem]">Java / Spring &amp; React</span>
          </div>
        </motion.div>
      </div>

      {/* Contribution Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="p-5 sm:p-7 rounded-2xl bg-zinc-900/60 border border-zinc-800 overflow-hidden flex flex-col items-center shadow-sm"
      >
        <div className="w-full flex items-center justify-between border-b border-zinc-800 pb-4 mb-5">
          <h3 className="text-white font-syne font-bold text-sm sm:text-base">Contributions in the last year</h3>
          <span className="font-mono text-[0.62rem] sm:text-[0.68rem] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
            Active Committer
          </span>
        </div>
        <div className="w-full overflow-x-auto pb-1 sm:pb-2 flex justify-start md:justify-center text-white">
          <div className="min-w-[680px] pr-2">
            <GitHubCalendar
              username={username}
              colorScheme={theme}
              blockSize={11}
              blockMargin={3.5}
              fontSize={12}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}


-- Registers KYRVEX in the shared ssalmuk_ranking Supabase leaderboard.
-- The core schema (games, boards, scores, get_leaderboard, submit_score) lives in the SKYHOOK repo:
-- supabase/migrations/20260915000000_ranking_core.sql. Safe to re-run.
-- Value: valid lap time in milliseconds, lower wins. Keep in sync with dist/ranking-boards.js.
insert into public.games (id, name) values ('kyrvex', 'KYRVEX')
on conflict (id) do update set name = excluded.name;

insert into public.boards (game_id, id, name, higher_is_better, min_value, max_value) values
  ('kyrvex', 'costa-r4', '코스타 아줄', false, 50225, 1800000),
  ('kyrvex', 'noctis-r3', '녹티스 하버', false, 45033, 1800000),
  ('kyrvex', 'safra-r3', '사프라 듄스', false, 59003, 1800000),
  ('kyrvex', 'valdenoir-r3', '발데누아르', false, 47540, 1800000)
on conflict (game_id, id) do update set
  name = excluded.name, higher_is_better = excluded.higher_is_better, min_value = excluded.min_value,
  max_value = excluded.max_value, penalty_key = excluded.penalty_key, penalty_per = excluded.penalty_per;

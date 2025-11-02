export type Difficulty = "easy" | "medium" | "hard" | "limited-availability" | "impossible"

export interface DeleteGuide {
  name: string
  url: string
  difficulty: Difficulty
  notes: string
  notes_de?: string
  notes_it?: string
  notes_ru?: string
  notes_tr?: string
  notes_ca?: string
  notes_es?: string
  notes_fr?: string
  notes_pt_BR?: string
  notes_zh?: string
  notes_ja?: string
  notes_ko?: string
  // Multilingual difficulty support
  difficulty_de?: string
  difficulty_it?: string
  difficulty_ru?: string
  difficulty_tr?: string
  difficulty_ca?: string
  difficulty_es?: string
  difficulty_fr?: string
  difficulty_pt_BR?: string
  difficulty_zh?: string
  difficulty_ja?: string
  difficulty_ko?: string
  email?: string
  email_subject?: string
  email_body?: string
  // Multilingual email subject support
  email_subject_de?: string
  email_subject_it?: string
  email_subject_ru?: string
  email_subject_tr?: string
  email_subject_ca?: string
  email_subject_es?: string
  email_subject_fr?: string
  email_subject_pt_BR?: string
  email_subject_zh?: string
  email_subject_ja?: string
  email_subject_ko?: string
  // Multilingual email body support
  email_body_de?: string
  email_body_it?: string
  email_body_ru?: string
  email_body_tr?: string
  email_body_ca?: string
  email_body_es?: string
  email_body_fr?: string
  email_body_pt_BR?: string
  email_body_zh?: string
  email_body_ja?: string
  email_body_ko?: string
  domains: string[]
  categories?: string[]
  tags?: string[]
  popular?: boolean
  lastChecked?: string
}

export interface ProcessedGuide extends DeleteGuide {
  id: string
  slug: string
  category: string
  // Localized fields
  localizedNotes?: string
  localizedDifficulty?: string
  localizedEmailSubject?: string
  localizedEmailBody?: string
}

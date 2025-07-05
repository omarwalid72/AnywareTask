export interface Announcement {
  _id: string;
  title: string;
  content: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
}
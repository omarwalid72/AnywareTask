import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import AnnouncementCard from '../components/Announcement/AnnouncementCard/AnnouncementCard';

// Mock props for testing
const mockAnnouncementProps = {
  _id: 'announcement-1',
  title: 'Important Update',
  content: 'Please read this important information about the upcoming changes.',
  date: '2025-01-15',
  priority: 'high',
  onEdit: jest.fn(),
  onDelete: jest.fn(),
  onPress: jest.fn(),
};

describe('AnnouncementCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders announcement information correctly', () => {
    render(<AnnouncementCard {...mockAnnouncementProps} />);
    
    // Check if title is rendered
    expect(screen.getByText('Important Update')).toBeTruthy();
    
    // Check if content is rendered
    expect(screen.getByText('Please read this important information about the upcoming changes.')).toBeTruthy();
    
    // Check if priority badge is rendered
    expect(screen.getByText('announcements.priority.high')).toBeTruthy();
    
    // Check if date is rendered
    expect(screen.getByText('2025-01-15')).toBeTruthy();
  });

  it('calls onPress when card is pressed', () => {
    render(<AnnouncementCard {...mockAnnouncementProps} />);
    
    const cardElement = screen.getByText('Important Update').parent.parent;
    fireEvent.press(cardElement);
    
    expect(mockAnnouncementProps.onPress).toHaveBeenCalledWith('announcement-1');
  });

  it('displays correct priority colors', () => {
    // Test low priority
    const lowPriorityProps = { ...mockAnnouncementProps, priority: 'low' };
    const { rerender } = render(<AnnouncementCard {...lowPriorityProps} />);
    expect(screen.getByText('announcements.priority.low')).toBeTruthy();
    
    // Test medium priority
    const mediumPriorityProps = { ...mockAnnouncementProps, priority: 'medium' };
    rerender(<AnnouncementCard {...mediumPriorityProps} />);
    expect(screen.getByText('announcements.priority.medium')).toBeTruthy();
    
    // Test high priority
    rerender(<AnnouncementCard {...mockAnnouncementProps} />);
    expect(screen.getByText('announcements.priority.high')).toBeTruthy();
  });

  it('handles missing optional props gracefully', () => {
    const minimalProps = {
      title: 'Test Announcement',
      content: 'Test Content',
      date: '2025-01-01',
      priority: 'low',
    };
    
    expect(() => render(<AnnouncementCard {...minimalProps} />)).not.toThrow();
  });

  it('handles long content text properly', () => {
    const longContentProps = {
      ...mockAnnouncementProps,
      content: 'This is a very long announcement content that should be displayed properly without breaking the layout. '.repeat(10),
    };
    
    expect(() => render(<AnnouncementCard {...longContentProps} />)).not.toThrow();
    expect(screen.getByText(longContentProps.content)).toBeTruthy();
  });

  it('displays date with calendar icon', () => {
    render(<AnnouncementCard {...mockAnnouncementProps} />);
    
    // Check if date is displayed correctly
    expect(screen.getByText('2025-01-15')).toBeTruthy();
  });
});

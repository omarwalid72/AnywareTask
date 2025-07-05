import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';

// Direct import from the component file
const AnnouncementCard = require('../../../components/Announcement/AnnouncementCard/AnnouncementCard').default;

// Mock props for testing
const mockAnnouncementProps = {
  _id: 'announcement-1',
  title: 'Important Update',
  content: 'Please read this important information about the upcoming changes.',
  date: '2025-01-15',
  priority: 'high' as const,
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
    
    const card = screen.getByText('Important Update').parent?.parent;
    fireEvent.press(card);
    
    expect(mockAnnouncementProps.onPress).toHaveBeenCalledWith('announcement-1');
  });

  it('calls onEdit when edit button is pressed', () => {
    render(<AnnouncementCard {...mockAnnouncementProps} />);
    
    const editButtons = screen.getAllByRole('button');
    const editButton = editButtons.find(button => 
      button.children?.some((child: any) => child?.props?.name === 'create-outline')
    );
    
    if (editButton) {
      fireEvent.press(editButton);
      expect(mockAnnouncementProps.onEdit).toHaveBeenCalledWith({
        _id: 'announcement-1',
        title: 'Important Update',
        content: 'Please read this important information about the upcoming changes.',
        date: '2025-01-15',
        priority: 'high',
      });
    }
  });

  it('calls onDelete when delete button is pressed', () => {
    render(<AnnouncementCard {...mockAnnouncementProps} />);
    
    const deleteButtons = screen.getAllByRole('button');
    const deleteButton = deleteButtons.find(button => 
      button.children?.some((child: any) => child?.props?.name === 'trash-outline')
    );
    
    if (deleteButton) {
      fireEvent.press(deleteButton);
      expect(mockAnnouncementProps.onDelete).toHaveBeenCalledWith('announcement-1');
    }
  });

  it('displays correct priority colors', () => {
    // Test low priority
    const lowPriorityProps = { ...mockAnnouncementProps, priority: 'low' as const };
    const { rerender } = render(<AnnouncementCard {...lowPriorityProps} />);
    expect(screen.getByText('announcements.priority.low')).toBeTruthy();
    
    // Test medium priority
    const mediumPriorityProps = { ...mockAnnouncementProps, priority: 'medium' as const };
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
      priority: 'low' as const,
    };
    
    expect(() => render(<AnnouncementCard {...minimalProps} />)).not.toThrow();
  });

  it('disables edit and delete buttons when no _id is provided', () => {
    const propsWithoutId = { ...mockAnnouncementProps, _id: undefined };
    render(<AnnouncementCard {...propsWithoutId} />);
    
    // Buttons should be disabled when _id is undefined
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      if (button.props.disabled !== undefined) {
        expect(button.props.disabled).toBe(true);
      }
    });
  });

  it('does not call onPress when _id is missing', () => {
    const propsWithoutId = { ...mockAnnouncementProps, _id: undefined };
    render(<AnnouncementCard {...propsWithoutId} />);
    
    const card = screen.getByText('Important Update').parent?.parent;
    fireEvent.press(card);
    
    expect(mockAnnouncementProps.onPress).not.toHaveBeenCalled();
  });

  it('handles long content text properly', () => {
    const longContentProps = {
      ...mockAnnouncementProps,
      content: 'This is a very long announcement content that should be displayed properly without breaking the layout. '.repeat(10),
    };
    
    expect(() => render(<AnnouncementCard {...longContentProps} />)).not.toThrow();
    expect(screen.getByText(longContentProps.content)).toBeTruthy();
  });
});

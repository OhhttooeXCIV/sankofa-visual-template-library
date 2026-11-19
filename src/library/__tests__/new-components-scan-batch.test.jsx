import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  DeliveryProcessFlow,
  CapabilityGrid,
  PrinciplesMatrix,
  DirectContactPanel,
  CoverageProgressCard,
  CourseworkMarksPlanner,
  DiagnosticAssessmentCard,
  RepairStudioCard,
  WorkspaceActionStrip,
  OperationalMetricStrip,
  InteractiveStatCard,
} from '../components';

describe('Scanned and imported candidate components', () => {
  it('renders DeliveryProcessFlow with sequential stages and deliverables', () => {
    render(<DeliveryProcessFlow />);
    expect(screen.getByText('Discover')).toBeInTheDocument();
    expect(screen.getByText('Define')).toBeInTheDocument();
    expect(screen.getByText('Build')).toBeInTheDocument();
    expect(screen.getByText('Launch')).toBeInTheDocument();
    expect(screen.getByText('01')).toBeInTheDocument();
  });

  it('renders CapabilityGrid with structured items and tags', () => {
    render(<CapabilityGrid />);
    expect(screen.getByText('Systems Analysis')).toBeInTheDocument();
    expect(screen.getByText('Software Engineering')).toBeInTheDocument();
    expect(screen.getByText('Analysis')).toBeInTheDocument();
  });

  it('renders PrinciplesMatrix with accessible columns and principles', () => {
    render(<PrinciplesMatrix />);
    expect(screen.getByText('Accessibility')).toBeInTheDocument();
    expect(screen.getByText('Design Principle')).toBeInTheDocument();
    expect(screen.getByText('Architectural Decision')).toBeInTheDocument();
    expect(screen.getByText('Release Check')).toBeInTheDocument();
  });

  it('renders DirectContactPanel with email and whatsapp actions', () => {
    render(
      <DirectContactPanel
        email="test@sankofa.co.za"
        whatsappNumber="+27754654865"
      />
    );
    const emailLink = screen.getByRole('link', { name: /prepare an email/i });
    expect(emailLink).toHaveAttribute('href', expect.stringContaining('mailto:test@sankofa.co.za'));

    const whatsappLink = screen.getByRole('link', { name: /open whatsapp/i });
    expect(whatsappLink).toHaveAttribute('href', expect.stringContaining('wa.me/27754654865'));
  });

  it('renders CoverageProgressCard with completion ring and actions', () => {
    const handleAction = vi.fn();
    render(
      <CoverageProgressCard
        title="Exam Prep"
        completed={25}
        total={50}
        actions={[{ label: 'Weak areas', count: 3, onClick: handleAction }]}
      />
    );
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('Exam Prep')).toBeInTheDocument();
    const actionBtn = screen.getByRole('button', { name: /weak areas/i });
    fireEvent.click(actionBtn);
    expect(handleAction).toHaveBeenCalledTimes(1);
  });

  it('calculates weighted points accurately in CourseworkMarksPlanner', () => {
    render(<CourseworkMarksPlanner initialValues={['80', '40', '50']} />);
    // 80/100 * 20 = 16.0; 40/50 * 30 = 24.0; 50/100 * 50 = 25.0. Total = 65.0
    expect(screen.getByText('65.0 / 100')).toBeInTheDocument();
    expect(screen.getByText(/target reached/i)).toBeInTheDocument();
  });

  it('handles DiagnosticAssessmentCard selection, submission, and rationale reveal', () => {
    const onComplete = vi.fn();
    render(<DiagnosticAssessmentCard onComplete={onComplete} />);
    const radioInputs = screen.getAllByRole('radio');
    fireEvent.click(radioInputs[1]); // select correct option

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'certain' } });

    const submitBtn = screen.getByRole('button', { name: /submit & reveal/i });
    fireEvent.click(submitBtn);

    expect(onComplete).toHaveBeenCalledWith({
      answer: 1,
      confidence: 'certain',
      isCorrect: true,
    });
    expect(screen.getByText(/correct/i)).toBeInTheDocument();
    expect(screen.getByText(/distinct input cell/i)).toBeInTheDocument();
  });

  it('supports criteria tallying and saving in RepairStudioCard', () => {
    const onSave = vi.fn();
    render(<RepairStudioCard onSaveCorrection={onSave} />);
    const textarea = screen.getByPlaceholderText(/explain how you would solve this/i);
    fireEvent.change(textarea, { target: { value: 'My independent draft answer' } });

    const revealBtn = screen.getByRole('button', { name: /reveal criteria and reasoning/i });
    fireEvent.click(revealBtn);

    expect(screen.getByText(/model explanation/i)).toBeInTheDocument();

    const saveBtn = screen.getByRole('button', { name: /record correction/i });
    fireEvent.click(saveBtn);
    expect(onSave).toHaveBeenCalled();
  });

  it('handles WorkspaceActionStrip tone, live-region, and action click', () => {
    const onAction = vi.fn();
    render(
      <WorkspaceActionStrip
        title="Supervisor sign-off needed"
        detail="All timesheet lines entered"
        stateLabel="Pending Signoff"
        actionLabel="Sign off now"
        tone="warning"
        onAction={onAction}
      />
    );
    expect(screen.getByRole('status')).toHaveTextContent('Pending Signoff');
    const button = screen.getByRole('button', { name: /sign off now/i });
    fireEvent.click(button);
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('renders OperationalMetricStrip with multiple metrics and tones', () => {
    render(
      <OperationalMetricStrip
        metrics={[
          { label: 'Active', value: '18', tone: 'success' },
          { label: 'Blocked', value: '2', tone: 'danger' },
        ]}
      />
    );
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('18')).toBeInTheDocument();
    expect(screen.getByText('Blocked')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('handles InteractiveStatCard click and keyboard trigger', () => {
    const onClick = vi.fn();
    render(
      <InteractiveStatCard
        title="Fleet Vehicles"
        value="42"
        badge="Active"
        onClick={onClick}
      />
    );
    const card = screen.getByRole('button', { name: /inspect drill down for fleet vehicles/i });
    fireEvent.click(card);
    expect(onClick).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(card, { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(2);
  });
});

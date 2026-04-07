import { describe, expect, it } from 'vitest';

import {
  getOpsxProposeSkillTemplate,
  getOpsxProposeCommandTemplate,
} from '../../../src/core/templates/skill-templates.js';

describe('verification content in propose template', () => {
  it('skill template includes verification profile assignment instructions', () => {
    const template = getOpsxProposeSkillTemplate();
    expect(template.instructions).toContain('Verification Profile');
    expect(template.instructions).toContain('ui-component');
    expect(template.instructions).toContain('api-endpoint');
    expect(template.instructions).toContain('integration');
    expect(template.instructions).toContain('database');
    expect(template.instructions).toContain('infrastructure');
    expect(template.instructions).toContain('refactoring');
  });

  it('command template includes verification profile assignment instructions', () => {
    const template = getOpsxProposeCommandTemplate();
    expect(template.content).toContain('Verification Profile');
    expect(template.content).toContain('ui-component');
    expect(template.content).toContain('api-endpoint');
    expect(template.content).toContain('integration');
    expect(template.content).toContain('database');
    expect(template.content).toContain('infrastructure');
    expect(template.content).toContain('refactoring');
  });

  it('propose template includes signal definitions for each profile', () => {
    const template = getOpsxProposeSkillTemplate();
    expect(template.instructions).toContain('containers');
    expect(template.instructions).toContain('lint');
    expect(template.instructions).toContain('property tests');
    expect(template.instructions).toContain('contract validation');
    expect(template.instructions).toContain('e2e');
  });
});

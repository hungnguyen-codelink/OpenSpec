import { describe, expect, it } from 'vitest';

import {
  getOpsxProposeSkillTemplate,
  getOpsxProposeCommandTemplate,
  getApplyChangeSkillTemplate,
  getOpsxApplyCommandTemplate,
  getVerifyChangeSkillTemplate,
  getOpsxVerifyCommandTemplate,
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

describe('verification content in apply template', () => {
  describe('TDD integration', () => {
    it('skill template includes TDD red-green-refactor cycle', () => {
      const template = getApplyChangeSkillTemplate();
      expect(template.instructions).toContain('TDD');
      expect(template.instructions).toContain('failing test');
      expect(template.instructions).toContain('red');
      expect(template.instructions).toContain('green');
      expect(template.instructions).toContain('refactor');
    });

    it('command template includes TDD red-green-refactor cycle', () => {
      const template = getOpsxApplyCommandTemplate();
      expect(template.content).toContain('TDD');
      expect(template.content).toContain('failing test');
      expect(template.content).toContain('red');
      expect(template.content).toContain('green');
      expect(template.content).toContain('refactor');
    });
  });

  describe('Docker environment setup', () => {
    it('skill template includes Docker setup instructions', () => {
      const template = getApplyChangeSkillTemplate();
      expect(template.instructions).toContain('Docker');
      expect(template.instructions).toContain('docker compose');
      expect(template.instructions).toContain('Dockerfile');
      expect(template.instructions).toContain('health');
    });

    it('command template includes Docker setup instructions', () => {
      const template = getOpsxApplyCommandTemplate();
      expect(template.content).toContain('Docker');
      expect(template.content).toContain('docker compose');
      expect(template.content).toContain('Dockerfile');
      expect(template.content).toContain('health');
    });
  });

  describe('Verification gate', () => {
    it('skill template includes verification gate signals', () => {
      const template = getApplyChangeSkillTemplate();
      expect(template.instructions).toContain('Verification Gate');
      expect(template.instructions).toContain('Static analysis');
      expect(template.instructions).toContain('Property');
      expect(template.instructions).toContain('Mutation testing');
      expect(template.instructions).toContain('Contract validation');
      expect(template.instructions).toContain('E2E');
    });

    it('command template includes verification gate signals', () => {
      const template = getOpsxApplyCommandTemplate();
      expect(template.content).toContain('Verification Gate');
      expect(template.content).toContain('Static analysis');
      expect(template.content).toContain('Property');
      expect(template.content).toContain('Mutation testing');
      expect(template.content).toContain('Contract validation');
      expect(template.content).toContain('E2E');
    });
  });

  describe('Structured logging', () => {
    it('skill template includes structured logging setup', () => {
      const template = getApplyChangeSkillTemplate();
      expect(template.instructions).toContain('structured log');
      expect(template.instructions).toContain('trace_id');
      expect(template.instructions).toContain('error_category');
    });

    it('command template includes structured logging setup', () => {
      const template = getOpsxApplyCommandTemplate();
      expect(template.content).toContain('structured log');
      expect(template.content).toContain('trace_id');
      expect(template.content).toContain('error_category');
    });
  });

  describe('Auto-debug on failure', () => {
    it('skill template includes systematic debugging with structured logs', () => {
      const template = getApplyChangeSkillTemplate();
      expect(template.instructions).toContain('root cause');
      expect(template.instructions).toContain('hypothesis');
      expect(template.instructions).toContain('escalate');
      expect(template.instructions).toContain('STUCK');
      expect(template.instructions).toContain('EXHAUSTED');
    });

    it('command template includes systematic debugging with structured logs', () => {
      const template = getOpsxApplyCommandTemplate();
      expect(template.content).toContain('root cause');
      expect(template.content).toContain('hypothesis');
      expect(template.content).toContain('escalate');
      expect(template.content).toContain('STUCK');
      expect(template.content).toContain('EXHAUSTED');
    });
  });
});

describe('verification content in verify template', () => {
  describe('DST simulation', () => {
    it('skill template includes DST fault injection', () => {
      const template = getVerifyChangeSkillTemplate();
      expect(template.instructions).toContain('DST');
      expect(template.instructions).toContain('fault injection');
      expect(template.instructions).toContain('Toxiproxy');
      expect(template.instructions).toContain('latency');
      expect(template.instructions).toContain('recovery');
    });

    it('command template includes DST fault injection', () => {
      const template = getOpsxVerifyCommandTemplate();
      expect(template.content).toContain('DST');
      expect(template.content).toContain('fault injection');
      expect(template.content).toContain('Toxiproxy');
      expect(template.content).toContain('latency');
      expect(template.content).toContain('recovery');
    });
  });

  describe('E2E verification', () => {
    it('skill template includes Playwright e2e', () => {
      const template = getVerifyChangeSkillTemplate();
      expect(template.instructions).toContain('Playwright');
      expect(template.instructions).toContain('Figma-Compliance');
      expect(template.instructions).toContain('Business-Workflows');
      expect(template.instructions).toContain('Smoke');
    });

    it('command template includes Playwright e2e', () => {
      const template = getOpsxVerifyCommandTemplate();
      expect(template.content).toContain('Playwright');
      expect(template.content).toContain('Figma-Compliance');
      expect(template.content).toContain('Business-Workflows');
      expect(template.content).toContain('Smoke');
    });
  });

  describe('Pre-complete gate', () => {
    it('skill template includes evidence-before-claims', () => {
      const template = getVerifyChangeSkillTemplate();
      expect(template.instructions).toContain('evidence');
      expect(template.instructions).toContain('exit code');
      expect(template.instructions).toContain('NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE');
    });

    it('command template includes evidence-before-claims', () => {
      const template = getOpsxVerifyCommandTemplate();
      expect(template.content).toContain('evidence');
      expect(template.content).toContain('exit code');
      expect(template.content).toContain('NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE');
    });
  });

  describe('Code review', () => {
    it('skill template includes structured code review', () => {
      const template = getVerifyChangeSkillTemplate();
      expect(template.instructions).toContain('Code Review');
      expect(template.instructions).toContain('critical');
      expect(template.instructions).toContain('security');
      expect(template.instructions).toContain('test gaps');
    });

    it('command template includes structured code review', () => {
      const template = getOpsxVerifyCommandTemplate();
      expect(template.content).toContain('Code Review');
      expect(template.content).toContain('critical');
      expect(template.content).toContain('security');
      expect(template.content).toContain('test gaps');
    });
  });

  describe('Unified verification report', () => {
    it('skill template includes unified report structure', () => {
      const template = getVerifyChangeSkillTemplate();
      expect(template.instructions).toContain('verification_report');
      expect(template.instructions).toContain('dst_simulation');
      expect(template.instructions).toContain('e2e');
      expect(template.instructions).toContain('code_review');
      expect(template.instructions).toContain('overall');
    });

    it('command template includes unified report structure', () => {
      const template = getOpsxVerifyCommandTemplate();
      expect(template.content).toContain('verification_report');
      expect(template.content).toContain('dst_simulation');
      expect(template.content).toContain('e2e');
      expect(template.content).toContain('code_review');
      expect(template.content).toContain('overall');
    });
  });
});

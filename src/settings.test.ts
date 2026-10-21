import { describe, expect, test } from 'vitest';
import { isPathExcluded, parseExcludedFolders } from './settings';

describe('parseExcludedFolders', () => {
	test('returns empty list for empty input', () => {
		expect(parseExcludedFolders('')).toEqual([]);
		expect(parseExcludedFolders('  \n  ')).toEqual([]);
	});

	test('trims whitespace and drops blank lines', () => {
		expect(parseExcludedFolders('Daily\n\n  Archive/2024  \n')).toEqual(['Daily', 'Archive/2024']);
	});

	test('strips surrounding slashes and normalizes backslashes', () => {
		expect(parseExcludedFolders('/Daily/\nArchive\\2024')).toEqual(['Daily', 'Archive/2024']);
	});

	test('dedupes repeated folders', () => {
		expect(parseExcludedFolders('Daily\nDaily\n/ Daily /')).toEqual(['Daily']);
	});
});

describe('isPathExcluded', () => {
	test('returns false when nothing is excluded', () => {
		expect(isPathExcluded('Daily/2024-01-01.md', [])).toBe(false);
	});

	test('matches files nested under an excluded folder', () => {
		expect(isPathExcluded('Daily/2024-01-01.md', ['Daily'])).toBe(true);
		expect(isPathExcluded('Archive/2024/jan/note.md', ['Archive/2024'])).toBe(true);
	});

	test('does not match sibling folders sharing a prefix', () => {
		expect(isPathExcluded('DailyNotes/x.md', ['Daily'])).toBe(false);
		expect(isPathExcluded('Archive/2024b/note.md', ['Archive/2024'])).toBe(false);
	});

	test('does not match parent folders or unrelated paths', () => {
		expect(isPathExcluded('note.md', ['Daily'])).toBe(false);
		expect(isPathExcluded('Other/note.md', ['Daily', 'Archive'])).toBe(false);
	});
});

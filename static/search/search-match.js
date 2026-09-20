'use strict';
// Whole-word matching shared by publication search and the full-text worker.
globalThis.SearchMatch = {
 normalize: text => text.normalize('NFKC').toLowerCase().replace(/\s+/g, ' '),
 patterns(query) {
  return (query.match(/"[^"]+"|\S+/g) || [])
   .map(term => this.normalize(term.replace(/^"|"$/g, '')))
   .filter(Boolean)
   .map(term => new RegExp('(?<![\\p{L}\\p{N}_])' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![\\p{L}\\p{N}_])', 'u'));
 }
};

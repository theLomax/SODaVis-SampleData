/**
 * Parks for the fixture's invented venues.
 *
 * Shared between the fixture test suite and `scripts/write-expected-example.mjs`, so
 * the expected figures are derived against the same parks the tests resolve against.
 * A second copy would drift.
 *
 * Between them these exercise both resolution mechanisms — a glob for unseen field
 * numbers, and an exact alias for the trailing-period twin a pattern would miss — and
 * one park deliberately has no mileage, which is a case the app must surface rather
 * than estimate around.
 */
import type { Park } from '../../src/model/reference'

export const FIXTURE_PARKS: Park[] = [
  {
    id: 'northside', name: 'Northside Complex', city: 'Riverview',
    aliases: [], venuePatterns: ['Northside Complex*'],
    oneWayMiles: 10, oneWayDriveMinutes: 20, tollEstimate: 2,
  },
  {
    id: 'eastfield', name: 'Eastfield Park', city: 'Eastfield',
    aliases: [], venuePatterns: ['Eastfield Park*'],
    oneWayMiles: 5, oneWayDriveMinutes: 12,
  },
  {
    id: 'lakeview', name: 'Lakeview Park', city: 'Lakeview',
    aliases: [], venuePatterns: ['Lakeview Park*'],
    oneWayMiles: 20, oneWayDriveMinutes: 30, tollEstimate: 4,
  },
  {
    id: 'summit', name: 'Summit Fields', city: 'Summit',
    aliases: [], venuePatterns: ['Summit Fields*'],
    oneWayMiles: 15, oneWayDriveMinutes: 25,
  },
  {
    id: 'westgate', name: 'Westgate Athletic Park', city: 'Westgate',
    // Both spellings listed: the export contains a trailing-period twin.
    aliases: ['Westgate Athletic Park', 'Westgate Athletic Park.'],
    venuePatterns: ['Westgate Athletic Park*'],
    oneWayMiles: 8, oneWayDriveMinutes: 15,
  },
  {
    id: 'cedar-ridge', name: 'Cedar Ridge Softball', city: 'Cedar Ridge',
    aliases: [], venuePatterns: ['Cedar Ridge Softball*'],
    oneWayMiles: 12, oneWayDriveMinutes: 22,
  },
  {
    // Reached only by a cancellation, so it forms no trip — a distinct case from a
    // park with no games at all.
    id: 'brookside', name: 'Brookside Fields', city: 'Brookside',
    aliases: [], venuePatterns: ['Brookside Fields*'],
    oneWayMiles: 7, oneWayDriveMinutes: 14,
  },
  {
    // No mileage on record, deliberately: the app must say so rather than estimate,
    // and a trip here cannot be timed by any model that needs a drive figure.
    id: 'outpost', name: 'Outpost Diamond', city: 'Outpost',
    aliases: [], venuePatterns: ['Outpost Diamond*'],
  },
  // Hilltop-2 is deliberately absent: an unmatched venue must surface as
  // unplaceable rather than silently become its own park.
]

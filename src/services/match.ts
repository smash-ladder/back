import { Match } from '../models/match';
import { Ladder } from '../models/ladder';
import { Player } from '../models/player';
import { NotFoundError } from '../errors';
import { PlayerService } from './player';
import db from '../db';

export class MatchService {

  async getByLadderAndId(ladder: Ladder, id: number): Promise<Match> {

    const match = (await this.getByLadder(ladder)).find( match =>
      match.id === id
    );
    if (typeof match === 'undefined') {
      throw new NotFoundError('No such match');
    }
    return match;

  }

  async getByLadder(ladder: Ladder): Promise<Match[]> {

    if (ladder.key !== 'ssb64-1v1') {
      return [];
    }

    const playerService = new PlayerService();

    const query = `
      SELECT * FROM smash_match WHERE ladder_id = ?
    `;

    const result = await db.query(query, [ladder.key]);
    const matches: Match[] = [];

    for (const row of result[0]) {

      matches.push({
        id: row.id,
        created: new Date(row.created * 1000),
        ladder: ladder,
        winner: await playerService.getById(row.winner_id),
        loser: await playerService.getById(row.loser_id),
        livesLeft: row.livesLeft
      });

    }

    return matches;

  }

  async save(match: Match) {

    const query = `
      INSERT INTO smash_match SET
        created = UNIX_TIMESTAMP(),
        ?
      `;

    const result = await db.query(query, [{
      ladder_id: match.ladder.key,
      winner_id: match.winner.id,
      loser_id: match.loser.id,
      livesLeft: match.livesLeft
    }]);

    match.id = result[0].insertId;

  }

}

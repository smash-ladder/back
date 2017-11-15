import { Ladder } from '../../models/ladder';

export function collection(ladders: Ladder[]) {

  return {
    _links: {
      self: { href: '/ladders' },
    },
    _embedded: {
      item: ladders.map(model)
    }
  };

}

export function model(ladder: Ladder) {

  return {
    _links: {
      self: { href: '/ladders/' + ladder.key },
      game: { href: '/games/' + ladder.game.key },
      ranking: { href: '/ladders/' + ladder.key + '/rankings' },
      allowedStages: ladder.allowedStages.map( stage => {
        return {
          href: '/games/' + stage.game.key + '/stages/' + stage.key
        };
      })
    },
    title: ladder.title
  };

}

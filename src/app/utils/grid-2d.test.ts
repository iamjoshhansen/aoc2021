import { Grid2D } from './grid-2d';
import { expect } from 'chai';

describe('Grid2D', () => {
  describe('Using numbers', () => {
    let grid: Grid2D<number>;

    beforeEach(async () => {
      grid = new Grid2D([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [10, 11, 12],
      ]);
    });

    it('should create', () => {
      expect(grid).to.exist;
    });

    it('height', () => {
      expect(grid.height).to.eq(4);
    });

    it('width', () => {
      expect(grid.width).to.eq(3);
    });

    it('size', () => {
      expect(grid.size).to.eq(12);
    });

    it('has the right values', () => {
      expect(grid.values).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    });

    it('generates the right positions', () => {
      expect([...grid.positionGenerator()]).to.eql([
        {
          x: 0,
          y: 0,
        },
        {
          x: 1,
          y: 0,
        },
        {
          x: 2,
          y: 0,
        },
        {
          x: 0,
          y: 1,
        },
        {
          x: 1,
          y: 1,
        },
        {
          x: 2,
          y: 1,
        },
        {
          x: 0,
          y: 2,
        },
        {
          x: 1,
          y: 2,
        },
        {
          x: 2,
          y: 2,
        },
        {
          x: 0,
          y: 3,
        },
        {
          x: 1,
          y: 3,
        },
        {
          x: 2,
          y: 3,
        },
      ]);
    });

    it('generates the right valuesAndPositionsGenerator', () => {
      expect([...grid.valuesAndPositionsGenerator()]).to.eql([
        {
          value: 1,
          position: {
            x: 0,
            y: 0,
          },
        },
        {
          value: 2,
          position: {
            x: 1,
            y: 0,
          },
        },
        {
          value: 3,
          position: {
            x: 2,
            y: 0,
          },
        },
        {
          value: 4,
          position: {
            x: 0,
            y: 1,
          },
        },
        {
          value: 5,
          position: {
            x: 1,
            y: 1,
          },
        },
        {
          value: 6,
          position: {
            x: 2,
            y: 1,
          },
        },
        {
          value: 7,
          position: {
            x: 0,
            y: 2,
          },
        },
        {
          value: 8,
          position: {
            x: 1,
            y: 2,
          },
        },
        {
          value: 9,
          position: {
            x: 2,
            y: 2,
          },
        },
        {
          value: 10,
          position: {
            x: 0,
            y: 3,
          },
        },
        {
          value: 11,
          position: {
            x: 1,
            y: 3,
          },
        },
        {
          value: 12,
          position: {
            x: 2,
            y: 3,
          },
        },
      ]);
    });

    it('has the right valuesGenerator', () => {
      expect([...grid.valuesGenerator()]).to.eql([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
      ]);
    });

    describe('domain', () => {
      it('all generated positions are in the domain', () => {
        for (let pos of grid.positionGenerator()) {
          expect(grid.isInDomain(pos)).to.be.true;
        }
      });

      it('has a few outside the domain', () => {
        expect(grid.isInDomain({ x: -1, y: 0 })).to.be.false;
        expect(grid.isInDomain({ x: 0, y: -1 })).to.be.false;
        expect(grid.isInDomain({ x: grid.width, y: 0 })).to.be.false;
        expect(grid.isInDomain({ x: 0, y: grid.height })).to.be.false;
      });
    });

    describe('can get values', () => {
      it('[0,0]', () => {
        expect(grid.getValue({ x: 0, y: 0 })).to.eq(1);
      });
      it('[0,1]', () => {
        expect(grid.getValue({ x: 0, y: 1 })).to.eq(4);
      });
      it('[-1,0] (null)', () => {
        expect(grid.getValue({ x: -1, y: 0 })).to.be.null;
      });
    });

    describe('neighbors', () => {
      describe('sides', () => {
        it('from inside', () => {
          expect(grid.neighborsFromSides({ x: 1, y: 1 })).to.eql([2, 4, 6, 8]);
        });

        it('from side', () => {
          expect(grid.neighborsFromSides({ x: 0, y: 1 })).to.eql([1, 5, 7]);
        });

        it('from corner', () => {
          expect(grid.neighborsFromSides({ x: 0, y: 0 })).to.eql([2, 4]);
        });
      });

      describe('diagnal', () => {
        it('from inside', () => {
          expect(grid.neighborsFromDiagnals({ x: 1, y: 1 })).to.eql([
            3, 9, 7, 1,
          ]);
        });

        it('from side', () => {
          expect(grid.neighborsFromDiagnals({ x: 0, y: 1 })).to.eql([2, 8]);
        });

        it('from corner', () => {
          expect(grid.neighborsFromDiagnals({ x: 0, y: 0 })).to.eql([5]);
        });
      });

      describe('all', () => {
        it('from inside', () => {
          expect(grid.neighbors({ x: 1, y: 1 })).to.eql([
            2, 4, 6, 8, 3, 9, 7, 1,
          ]);
        });

        it('from side', () => {
          expect(grid.neighbors({ x: 0, y: 1 })).to.eql([1, 5, 7, 2, 8]);
        });

        it('from corner', () => {
          expect(grid.neighbors({ x: 0, y: 0 })).to.eql([2, 4, 5]);
        });
      });
    });
  });
});

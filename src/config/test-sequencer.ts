const Sequencer = require('@jest/test-sequencer').default;

// Tests in  Alphabetical order !!
class CustomSequencer extends Sequencer {
    shard(tests: any, { shardIndex, shardCount }: any) {
        const shardSize = Math.ceil(tests.length / shardCount);
        const shardStart = shardSize * (shardIndex - 1);
        const shardEnd = shardSize * shardIndex;

        return [...tests]
            .sort((a, b) => (a.path > b.path ? 1 : -1))
            .slice(shardStart, shardEnd);
    }

    sort(tests: any) {
        const copyTests = Array.from(tests);
        return copyTests.sort((testA: any, testB: any) => (testA.path > testB.path ? 1 : -1));
    }
}

module.exports = CustomSequencer;
import { atlasTestDBConnection } from "./database";

beforeAll(async () => {
    await atlasTestDBConnection();
});
import { subscribeDrags } from "./drags";
import { subStream } from "./search";
import { subscribeClicks, subscribeClicksMapped } from "./Observable";

subscribeDrags();
subStream();
// subscribeClicks();
subscribeClicksMapped();
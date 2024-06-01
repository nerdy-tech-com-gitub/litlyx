
import { getUserProjectFromId } from "~/server/LIVE_DEMO_DATA";
import { VisitModel } from "@schema/metrics/VisitSchema";
import { DATA_EXPIRE_TIME, Redis } from "~/server/services/CacheService";


export type VisitsWebsiteAggregated = {
    _id: string,
    count: number
}

export default defineEventHandler(async event => {

    const project_id = getRequestProjectId(event);
    if (!project_id) return;

    const user = getRequestUser(event);
    const project = await getUserProjectFromId(project_id, user);
    if (!project) return;


    const limit = getRequestHeader(event, 'x-query-limit');
    const numLimit = parseInt(limit || '10');

    return await Redis.useCache({
        key: `websites:${project_id}:${numLimit}`,
        exp: DATA_EXPIRE_TIME
    }, async () => {
        const websites: VisitsWebsiteAggregated[] = await VisitModel.aggregate([
            { $match: { project_id: project._id }, },
            { $group: { _id: "$website", count: { $sum: 1, } } },
            { $sort: { count: -1 } },
            { $limit: numLimit }
        ]);

        return websites;
    });


});
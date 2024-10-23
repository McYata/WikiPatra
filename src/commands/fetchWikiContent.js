"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchWikiContent = fetchWikiContent;
const node_fetch_1 = __importDefault(require("node-fetch"));
function fetchWikiContent(title) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&titles=${encodeURIComponent(title)}&rvprop=content&formatversion=2`;
        try {
            const response = yield (0, node_fetch_1.default)(url);
            const data = (yield response.json());
            if (data.query && data.query.pages.length > 0) {
                const page = data.query.pages[0];
                if (page.revisions && page.revisions.length > 0) {
                    return page.revisions[0].content;
                }
            }
            return 'No content found';
        }
        catch (error) {
            console.error(error);
            return 'Failed to fetch content';
        }
    });
}

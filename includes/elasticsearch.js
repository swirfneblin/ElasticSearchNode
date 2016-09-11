var elasticsearch = require('elasticsearch');
var elasticClient = elasticsearch.Client({
	host:"localhost:9200",
	log: "info" 
});

var indexName = "randomindex";

function DeleteIndex(){
	return elasticClient.indices.delete({
		index: indexName
	});
}
exports.DeleteIndex = DeleteIndex;

function InitIndex(){
	return elasticClient.indices.create({
		index: indexName
	});
} 
exports.InitIndex = InitIndex;

function IndexExists(){
	return elasticClient.indices.exists({
		index: indexName
	});
} 
exports.IndexExists = IndexExists;

function InitMapping() {  
    return elasticClient.indices.putMapping({
        index: indexName,
        type: "document",
        body: {
            properties: {
                title: { type: "string" },
                content: { type: "string" },
                suggest: {
                    type: "completion",
                    analyzer: "simple",
                    search_analyzer: "simple",
                    payloads: true
                }
            }
        }
    });
}
exports.InitMapping = InitMapping;

function AddDocument(document) {  
    return elasticClient.index({
        index: indexName,
        type: "document",
        body: {
            title: document.title,
            content: document.content,
            suggest: {
                input: document.title.split(" "),
                output: document.title,
                payload: document.metadata || {}
            }
        }
    });
}
exports.AddDocument = AddDocument;

function GetSuggestions(input) {  
    return elasticClient.suggest({
        index: indexName,
        type: "document",
        body: {
            docsuggest: {
                text: input,
                completion: {
                    field: "suggest",
                    fuzzy: true
                }
            }
        }
    })
}
exports.GetSuggestions = GetSuggestions;
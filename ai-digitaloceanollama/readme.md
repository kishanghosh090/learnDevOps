```curl http://localhost:11434/api/generate -d '{
  "model": "phi",
  "prompt": "Explain Redis in 3 lines",
  "stream": false
}'
```

---

```

ollama pull phi
ollama run phi

```

---

```
{"model":"phi","created_at":"2026-03-02T15:12:55.758628732Z","response":" Redis is a distributed, open-source, in-memory data structure store that provides high performance for storing and retrieving data. It's commonly used as a database, caching system, and message broker.\n","done":true,"done_reason":"stop","context":[11964,25,317,8537,1022,257,11040,2836,290,281,11666,4430,8796,13,383,8796,3607,7613,7429,284,262,2836,6,82,2683,13,198,12982,25,48605,2297,271,287,220,18,3951,198,48902,25,2297,271,318,257,9387,11,1280,12,10459,11,287,12,31673,1366,4645,3650,326,3769,1029,2854,329,23069,290,50122,1366,13,632,6,82,8811,973,355,257,6831,11,40918,1080,11,290,3275,20426,13,198],"total_duration":8101985932,"load_duration":61346347,"prompt_eval_count":39,"prompt_eval_duration":754006780,"eval_count":43,"eval_duration":7237782624}

```

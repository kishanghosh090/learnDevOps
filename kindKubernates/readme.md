## pods in kubernates --------------------------------

### imperitive and declarative way to create pod

```bash
kubectl run --image=nginx nginx-pod
kubectl apply -f pod.yaml
kubectl get pod -o wide
```

### get yaml

```bash
kubectl get pods nginx-pod -o yaml > pod.yaml
kubectl get pod  --show-labels
kubectl run <name-of-pod> --image=nginx --dry-run=client -o yaml > pod.yaml
```

### edit pod at RUN time

```bash
kubectl edit pod nginx-pod
```

### exec inside running pod

```bash
kubectl exec -it nginx-pod -- bash
```

## deployment in kubernates --------------------------------

### get yaml of deployment

```bash
kubectl create deployment nginx-deply --image=nginx --dry-run=client -o yaml > deploy.yaml
kubectl apply -f deploy.yaml
kubectl scale deploy nginx-deply --replicas=2
 kubectl rollout history deployment/<deployment-name>
```

### service in k8s --------------------------------

```bash
kubectl expose --help
kubectl expose deploy <deployment-name> --port=80
kubectl get svc
kubectl describe svc <svc-name>
kubectl port-forward <resource_type>/<resource_name> <local_port>:<remote_port>
example:
kubectl port-forward deploy/nginx-deploy 8080:80 [127.0.0.1:8080]
kubectl port-forward --address 0.0.0.0 deploy/nginx-deploy 8080:80 [0.0.0.0:8080]
'80' is the port which we expose from `kubectl expose deploy <deployment-name> --port=80` and it connect to the port which we mention in spec inside deploy.yaml containerPort: 80
```

- example

```shell
kubectl get pod -o wide
NAME READY STATUS RESTARTS AGE IP NODE NOMINATED NODE READINESS GATES
nginx-deploy-55bdff99f4-8tgbc 1/1 Running 0 5m13s 10.244.1.4 kind-worker <none> <none>
nginx-deploy-55bdff99f4-qlbqz 1/1 Running 0 5m15s 10.244.2.3 kind-worker2 <none> <none>
nginx-deploy-55bdff99f4-sll4j 1/1 Running 0 5m11s 10.244.2.4 kind-worker2 <none> <none>
ubuntu@ip-172-31-45-177:~/k8s$ kubectl exec -it nginx-deploy-55bdff99f4-8tgbc -- bash
root@nginx-deploy-55bdff99f4-8tgbc:/# curl 10.244.1.4:80
```

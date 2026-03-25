## pods in kubernates --------------------------------

### imperitive and declarative way to create pod

```bash
kubectl run --image=nginx nginx-pod
kubectl apply -f pod.yaml

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
```

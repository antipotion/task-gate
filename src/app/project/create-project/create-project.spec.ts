import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { ProjectFacade } from '../project-facade';
import { CreateProject } from './create-project';

describe('CreateProject', () => {
  let component: CreateProject;
  let fixture: ComponentFixture<CreateProject>;

  let router: { navigate: ReturnType<typeof vi.fn> };
  let facade: { addProject: ReturnType<typeof vi.fn> };
  let snackbar: { open: ReturnType<typeof vi.fn> };
  let route: Partial<ActivatedRoute>;

  beforeEach(async () => {
    router = { navigate: vi.fn() };
    facade = { addProject: vi.fn() };
    snackbar = { open: vi.fn() };
    route = { parent: {} as ActivatedRoute };

    await TestBed.configureTestingModule({
      imports: [CreateProject],
      providers: [
        provideRouter([]),
        ProjectFacade,
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: route },
        { provide: ProjectFacade, useValue: facade },
        { provide: MatSnackBar, useValue: snackbar },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProject);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Success Case
  it('should create project and navigate on success', async () => {
    facade.addProject.mockResolvedValue('123');

    component.projectForm.setValue({
      projectName: 'Test',
      deadline: '2026-01-01',
    });

    await component.onSubmit();

    expect(facade.addProject).toHaveBeenCalledWith({
      name: 'Test',
      deadline: '2026-01-01',
    });

    expect(router.navigate).toHaveBeenCalledWith(['123'], { relativeTo: route.parent });
  
    expect(component.projectForm.value).toEqual({
      projectName: null,
      deadline: null,
    });
  });

  // Error Case
  it('should handle error and show snackbar', async () => {
    facade.addProject.mockRejectedValue(new Error('fail'));

    const dismiss = vi.fn();

    snackbar.open.mockReturnValue({
      onAction: () => of(null),
      dismiss,
    });

    component.projectForm.setValue({
      projectName: 'Test',
      deadline: '2026-01-01',
    });

    await component.onSubmit();

    expect(component.projectForm.value).toEqual({
      projectName: null,
      deadline: null,
    });

    expect(component.createProjectState()).toBe('idle');

    expect(snackbar.open).toHaveBeenCalledWith('Project creation failed', 'Dismiss', {
      duration: 5000,
    });
  });

  // Snackbar Behavior
  it('should dismiss snackbar on action', () => {
    const dismiss = vi.fn();

    snackbar.open.mockReturnValue({
      onAction: () => of(null),
      dismiss,
    });

    component.openSnackBar('Test');

    expect(dismiss).toHaveBeenCalled();
  });

  // Invalid Form Case
  it('should not submit if form is invalid', async () => {
    component.projectForm.setValue({
      projectName: '',
      deadline: '',
    });

    await component.onSubmit();

    expect(facade.addProject).not.toHaveBeenCalled();
  });
});

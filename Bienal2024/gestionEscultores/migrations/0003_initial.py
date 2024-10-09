# Generated by Django 4.2.16 on 2024-10-07 18:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('gestionUsuarios', '0001_initial'),
        ('gestionEscultores', '0002_remove_administrador_dni_adm_remove_escultor_dni_adm_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Escultor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Nacionalidad', models.CharField(max_length=40)),
                ('Fecha_Nac', models.DateField()),
                ('Biografia', models.TextField()),
                ('DNI_Adm', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='gestionUsuarios.administrador')),
                ('DNI_Esc', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='gestionUsuarios.persona')),
            ],
        ),
        migrations.CreateModel(
            name='Escultura',
            fields=[
                ('ID_Escultura', models.AutoField(primary_key=True, serialize=False)),
                ('Fecha_creacion', models.DateField()),
                ('Titulo', models.CharField(max_length=55)),
                ('Intencion', models.TextField()),
                ('Cant_votos', models.IntegerField()),
                ('DNI_Esc', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gestionEscultores.escultor')),
            ],
        ),
    ]